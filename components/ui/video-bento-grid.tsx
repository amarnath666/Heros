"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { PrimaryButton } from "./primary-button";

interface BentoItem {
  title: string;
  videoSrc: string;
  href: string;
  className?: string;
}

const bentoItems: BentoItem[] = [
  {
    title: "Astral Flow",
    videoSrc: "https://assets.amarn.me/astral-flow.mp4",
    href: "/components/backgrounds/astral-flow",
    className: "md:col-span-5 md:row-span-2",
  },
  {
    title: "Gif Text",
    videoSrc: "https://assets.amarn.me/gif-text-v2.mp4",
    href: "/components/text-animations/gif-text",
    className: "md:col-span-3 md:row-span-1",
  },
  {
    title: "Grid Bloom",
    videoSrc: " https://assets.amarn.me/grid-bloom-v3.mp4",
    href: "/components/backgrounds/grid-bloom",
    className: "md:col-span-4 ",
  },
  {
    title: "Carousel",
    videoSrc: "https://assets.amarn.me/carousel2.mp4",
    href: "/components/carousels/carousel",
    className: "md:col-span-4 md:row-span-1",
  },
  {
    title: "Waves",
    videoSrc: "https://assets.amarn.me/waves.mp4",
    href: "/components/backgrounds/waves",
    className: "md:col-span-3 md:row-span-1",
  },

  {
    title: "Dancing Letters",
    videoSrc: "https://assets.amarn.me/dancing-lettersv3.mp4",
    href: "/components/text-animations/dancing-letters",
    className: "md:col-span-3",
  },
  {
    title: "Dock",

    videoSrc: "https://assets.amarn.me/dock2.mp4",
    href: "/components/navigation/dock",
    className: "md:col-span-4",
  },
  {
    title: "Gauge",
    videoSrc: "https://assets.amarn.me/gauge.mp4",
    href: "/components/sections/gauge",
    className: "md:col-span-5 md:row-span-2 ",
  },
  {
    title: "Animated Icons",
    videoSrc: "https://assets.amarn.me/animated-icons2.mp4",
    href: "/components/animated-icons",
    className: "md:col-span-7 rmd:ow-span-1",
  },
];

function BentoCard({ item }: { item: BentoItem }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  // Check if video is already loaded (e.g., from browser cache) on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) {
      // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {
        // Handle play error (e.g., user gesture required if not muted, but it is muted)
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative overflow-hidden rounded-[15px] border border-border ",
        "transition-all duration-300",
        item.className
      )}
    >
      {/* Video */}
      <div ref={containerRef} className="relative w-full h-full">
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlayThrough={() => setIsLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-sm md:text-base font-medium text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {item.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default function VideoBentoGrid() {
  return (
    <section className="w-full py-0 md:pt-[50px] ">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full auto-rows-[180px] md:auto-rows-[200px] gap-4">
          {bentoItems.map((item) => (
            <BentoCard key={item.title} item={item} />
          ))}
        </div>
        <Link
          href="/components"
          className="flex justify-center mt-5 md:mt-10 mb-10 md:mb-0 w-fit items-center mx-auto"
        >
          <PrimaryButton>View All Components</PrimaryButton>
        </Link>
      </div>
    </section>
  );
}
