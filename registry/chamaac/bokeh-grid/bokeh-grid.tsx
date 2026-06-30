"use client";

/* eslint-disable react/no-unknown-property -- These are valid React Three Fiber props. */

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { WebGLProgramParametersWithUniforms } from "three";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
interface BokehGridProps {
  color1?: string;
  color2?: string;
  intensity?: number;
}

function Grid({ color1 = "#00d2ff", color2 = "#ff0080" }: BokehGridProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const gridSize = useMemo(() => new THREE.Vector2(160, 110), []);
  const count = gridSize.x * gridSize.y;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridSize: { value: gridSize },
      uNoiseScale: { value: 0.05 },
      uRadiusDown: { value: 0.65 },
    }),
    [gridSize]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  React.useLayoutEffect(() => {
    const tempColor = new THREE.Color();
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < count; i++) {
      meshRef.current.setMatrixAt(i, matrix);

      const xPos = i % gridSize.x;
      const yPos = Math.floor(i / gridSize.x);

      // XorDev's specific "Shooting Stars" color palette
      // Shader logic: *(cos(p.y/.1+vec4(0,1,2,3))+1.)
      // We map the grid coordinates to a continuous phase value 't'
      const t = (yPos / gridSize.y) * 10.0 + (xPos / gridSize.x) * 10.0;

      const r_raw = (Math.cos(t + 0.0) + 1.0) * 0.5;
      const g_raw = (Math.cos(t + 1.0) + 1.0) * 0.5;
      const b_raw = (Math.cos(t + 2.0) + 1.0) * 0.5;

      // Force high saturation to prevent overlapping channels from blowing out into white!
      // By ensuring at least one color channel is always near 0.0, the Bloom can never
      // unintentionally add them up to pure white, maintaining perfectly vibrant neon hues.
      const min = Math.min(r_raw, g_raw, b_raw);
      const max = Math.max(r_raw, g_raw, b_raw);
      const range = max - min;

      const r = range > 0 ? ((r_raw - min) / range) * max : r_raw;
      const g = range > 0 ? ((g_raw - min) / range) * max : g_raw;
      const b = range > 0 ? ((b_raw - min) / range) * max : b_raw;

      tempColor.setRGB(r, g, b);

      meshRef.current.setColorAt(i, tempColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [count, color1, color2, gridSize]);

  const onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uGridSize = uniforms.uGridSize;
    shader.uniforms.uNoiseScale = uniforms.uNoiseScale;
    shader.uniforms.uRadiusDown = uniforms.uRadiusDown;

    shader.vertexShader =
      `
      uniform float uTime;
      uniform vec2 uGridSize;
      uniform float uNoiseScale;
      uniform float uRadiusDown;

      // 3D Simplex Noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 1.0/7.0;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
    ` + shader.vertexShader;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      float xPos = mod(float(gl_InstanceID), uGridSize.x);
      float yPos = floor(float(gl_InstanceID) / uGridSize.x);

      // Space X and Y uniformly so spheres overlap beautifully to form one continuous seamless pattern
      vec3 gridPos = vec3(
        (xPos - uGridSize.x * 0.5) * 0.85,
        (yPos - uGridSize.y * 0.5) * 0.85,
        0.0
      );

      float noiseValue = snoise(vec3(gridPos.x * uNoiseScale, gridPos.y * uNoiseScale, uTime * 0.25));
      // Map noise to scale (crunch the ramp to create sharp dark patches)
      float scaleNoise = smoothstep(-0.4, 0.4, noiseValue);

      vec3 transformed = position * (scaleNoise * uRadiusDown) + gridPos;
      `
    );
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <icosahedronGeometry args={[1, 4]} />
      <meshBasicMaterial
        color="#ffffff"
        toneMapped={false}
        onBeforeCompile={onBeforeCompile}
      />
    </instancedMesh>
  );
}
export default function BokehGrid({
  color1 = "#00d2ff",
  color2 = "#ff0080",
  intensity = 2.0,
}: BokehGridProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-0">
      <Canvas
        camera={{ position: [0, 0, 45], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <OrbitControls
          makeDefault
          enableDamping
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <color attach="background" args={["#000000"]} />

        <Grid color1={color1} color2={color2} />

        <EffectComposer>
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.2}
            bokehScale={5}
            height={480}
          />
          <Bloom
            luminanceThreshold={0.02}
            luminanceSmoothing={0.9}
            mipmapBlur
            intensity={intensity}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
