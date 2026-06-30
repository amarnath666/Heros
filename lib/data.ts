import { SidebarDataTypes } from "./types";

export const sidebarData: SidebarDataTypes[] = [
  {
    componentName: "Get Started",
    link: "/get-started",
    category: "Overview",
  },
  {
    componentName: "Components",
    link: "",
    category: "Overview",
  },
  // animated icons
  {
    componentName: "Icons Overview",
    link: "/animated-icons",
    category: "Animated Icons",
  },
  // backgrounds
  {
    componentName: "Light Speed",
    link: "/backgrounds/light-speed",
    category: "Backgrounds",
    isNew: true,
    isShader: true,
  },
  {
    componentName: "Synthesis",
    link: "/backgrounds/synthesis",
    category: "Backgrounds",
    isNew: true,
    isShader: true,
  },
  {
    componentName: "Electric Mist",
    link: "/backgrounds/electric-mist",
    category: "Backgrounds",
    isNew: true,
    isShader: true,
  },
  {
    componentName: "Astral Flow",
    link: "/backgrounds/astral-flow",
    category: "Backgrounds",
    isShader: true,
  },
  {
    componentName: "Nebula",
    link: "/backgrounds/nebula",
    category: "Backgrounds",
    isShader: true,
  },
  {
    componentName: "Grid Bloom",
    link: "/backgrounds/grid-bloom",
    category: "Backgrounds",
    isShader: true,
  },
  {
    componentName: "Liquid Chrome",
    link: "/backgrounds/liquid-chrome",
    category: "Backgrounds",
    isShader: true,
  },

  {
    componentName: "Waves",
    link: "/backgrounds/waves",
    category: "Backgrounds",
    isShader: true,
  },
  {
    componentName: "Interactive Grid",
    link: "/backgrounds/interactive-grid",
    category: "Backgrounds",
  },

  // inputs
  {
    componentName: "AI Input",
    link: "/inputs/ai-input",
    category: "Inputs",
  },

  // sections
  {
    componentName: "How It Works",
    link: "/sections/how-it-works",
    category: "Sections",
  },
  {
    componentName: "Stats Cards",
    link: "/sections/stats-cards",
    category: "Sections",
  },
  {
    componentName: "Feature Steps",
    link: "/sections/feature-steps",
    category: "Sections",
  },
  {
    componentName: "Gauge",
    link: "/sections/gauge",
    category: "Sections",
  },

  // buttons
  {
    componentName: "Buttons Overview",
    link: "/buttons",
    category: "Buttons",
  },
  {
    componentName: "Premium Button",
    link: "/buttons/premium-button",
    category: "Buttons",
  },
  {
    componentName: "Glowing Border",
    link: "/buttons/glowing-border-button",
    category: "Buttons",
  },
  {
    componentName: "Shimmer Button",
    link: "/buttons/shimmer-button",
    category: "Buttons",
  },
  {
    componentName: "Slide Up Button",
    link: "/buttons/slideup-button",
    category: "Buttons",
  },
  {
    componentName: "Focus Button",
    link: "/buttons/focus-button",
    category: "Buttons",
  },
  {
    componentName: "Neo Brutalist",
    link: "/buttons/neo-brutalist-button",
    category: "Buttons",
  },
  {
    componentName: "Hover Arrow",
    link: "/buttons/hover-arrow-button",
    category: "Buttons",
  },
  // text animations
  {
    componentName: "Text Loop",
    link: "/text-animations/text-loop",
    category: "Text Animations",
  },
  {
    componentName: "Dancing Letters",
    link: "/text-animations/dancing-letters",
    category: "Text Animations",
  },
  {
    componentName: "Gif Text",
    link: "/text-animations/gif-text",
    category: "Text Animations",
  },

  // navigation
  {
    componentName: "Dock",
    link: "/navigation/dock",
    category: "Navigation",
  },
  // carousels
  {
    componentName: "Carousel",
    link: "/carousels/carousel",
    category: "Carousels",
  },
];

interface ComponentCardType {
  title: string;
  description: string;
  imagePath: string;
  videoSrc?: string;
  link: string;
  category: string;
  bgColor?: string;
  isShader?: boolean;
}

export const componentCards: ComponentCardType[] = [
  {
    title: "Light Speed",
    description:
      "A Warp/Light-Speed hyperspace animation inspired by the Ducky3D Blender tutorial.",
    imagePath: "/components/backgrounds/light-speed.png",
    videoSrc: "https://assets.amarn.me/light-speed.mp4",
    link: "/components/backgrounds/light-speed",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Synthesis",
    description:
      "A professional, multi-layered cosmic flow background with extensive warping customization.",
    imagePath: "/components/backgrounds/synthesis.png",
    videoSrc: "https://assets.amarn.me/synthesis.mp4",
    link: "/components/backgrounds/synthesis",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Electric Mist",
    description:
      "A high-energy glowing lightning shader with waves and smoke effects.",
    imagePath: "/components/backgrounds/electric-mist.png",
    videoSrc: " https://assets.amarn.me/electric-mist-v2.mp4",
    link: "/components/backgrounds/electric-mist",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Astral Flow",
    description:
      "A majestic, constantly breathing radial shader with deep cosmic wisps.",
    imagePath: "/components/backgrounds/astral-flow.png",
    videoSrc: "https://assets.amarn.me/astral-flow.mp4",
    link: "/components/backgrounds/astral-flow",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Nebula",
    description: "A deep space nebula effect with fractional distortion.",
    videoSrc: "https://assets.amarn.me/nebula.mp4",
    imagePath: "/components/backgrounds/nebula.png",
    link: "/components/backgrounds/nebula",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  // {
  //   title: "Deform Tunnel",
  //   description: "A high-speed, customizable tunnel effect using texture deformation.",
  //   imagePath: "/components/backgrounds/deform-tunnel.png",
  //   link: "/components/backgrounds/deform-tunnel",
  //   category: "Backgrounds",
  //   bgColor: "bg-black dark:bg-black",
  // },
  {
    title: "Grid Bloom",
    description: "A mesmerizing grid pattern with pulsing wave interference.",
    imagePath: "/components/backgrounds/grid-bloom.png",
    videoSrc: "https://assets.amarn.me/grid-bloom-v3.mp4",
    link: "/components/backgrounds/grid-bloom",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Liquid Chrome",
    description: "A smooth, mesmerizing liquid metal shader effect.",
    videoSrc: "https://assets.amarn.me/liquid-chrome.mp4",
    imagePath: "/components/backgrounds/liquid-chrome.png",
    link: "/components/backgrounds/liquid-chrome",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Waves",
    description:
      "A mesmerizing, shader-driven wave animation ideal for modern landing pages.",
    videoSrc: "https://assets.amarn.me/waves.mp4",
    imagePath: "/components/backgrounds/waves.png",
    link: "/components/backgrounds/waves",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
    isShader: true,
  },
  {
    title: "Animated Icons",
    description:
      "A collection of smooth, micro-interaction animations for your icons.",
    imagePath: "/components/animated-icons.png",
    videoSrc: "https://assets.amarn.me/animated-icons2.mp4",
    link: "/components/animated-icons",
    category: "Animated Icons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "AI Input",
    description:
      "A polished AI input component with model selection, tools, file uploads, and smooth animations.",
    imagePath: "/components/inputs/ai-input.png",
    videoSrc: "https://assets.amarn.me/ai-input.mp4",
    link: "/components/inputs/ai-input",
    category: "Inputs",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "How It Works",
    description:
      "A dynamic visual flow component showing a step-by-step process with connected cards.",
    imagePath: "/components/sections/how-it-works.png",
    videoSrc: "https://assets.amarn.me/how-it-works.mp4",
    link: "/components/sections/how-it-works",
    category: "Sections",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Text Loop",
    description: "An animated text loop with typewriter and gradient effect.",
    imagePath: "/components/text-animations/text-loop.png",
    videoSrc: "https://assets.amarn.me/text-loop.mp4",
    link: "/components/text-animations/text-loop",
    category: "Text Animations",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Interactive Grid",
    description:
      "A highly interactive, mouse-sensitive grid background rendered.",
    imagePath: "/components/backgrounds/interactive-grid.png",
    videoSrc: "https://assets.amarn.me/interactive-grid.mp4",
    link: "/components/backgrounds/interactive-grid",
    category: "Backgrounds",
    bgColor: "bg-black dark:bg-black",
  },

  {
    title: "Stats Cards",
    description: "A set of animated statistic cards with hover effects.",
    imagePath: "/components/sections/stats-cards-new.png",
    videoSrc: " https://assets.amarn.me/stats-card.mp4",
    link: "/components/sections/stats-cards",
    category: "Sections",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Gauge",
    description:
      "A customizable semi-circular gauge component for visualizing metrics and performance scores.",
    imagePath: "/components/sections/gauge.png",
    videoSrc: "https://assets.amarn.me/gauge.mp4",
    link: "/components/sections/gauge",
    category: "Sections",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Gif Text",
    description: "A stunning text effect that uses a GIF as the fill color.",
    imagePath: "/components/text-animations/gif-text.png",
    videoSrc: "https://assets.amarn.me/gif-text-v2.mp4",
    link: "/components/text-animations/gif-text",
    category: "Text Animations",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Premium Button",
    description:
      "A collection of interactive and animated buttons for your applications.",
    imagePath: "/components/buttons/premium-button.png",
    videoSrc: "https://assets.amarn.me/premium_button.mp4",
    link: "/components/buttons/premium-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Neo Brutalist Button",
    description:
      "A bold, retro-styled button with skewed design, offset shadow, and shimmer effect.",
    imagePath: "/components/buttons/ne0-brutalist.png",
    videoSrc: "https://assets.amarn.me/neo-brutalist-buttonv2.mp4",
    link: "/components/buttons/neo-brutalist-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Glowing Border Button",
    description: "A button with a glowing border effect.",
    imagePath: "/components/buttons/glowing-border.png",
    videoSrc: "https://assets.amarn.me/glowing-border-button.mp4",
    link: "/components/buttons/glowing-border-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Shimmer Button",
    description:
      "A collection of interactive and animated buttons for your applications.",
    imagePath: "/components/buttons/shimmer.png",
    videoSrc: "https://assets.amarn.me/shimmer-button.mp4",
    link: "/components/buttons/shimmer-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Dancing Letters",
    description:
      "A sleek, interactive text animation component with physics-based effects.",
    imagePath: "/components/text-animations/dancing-letters.png",
    videoSrc: "https://assets.amarn.me/dancing-lettersv3.mp4",
    link: "/components/text-animations/dancing-letters",
    category: "Text Animations",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Carousel",
    description:
      "A smooth, auto-playing 3D carousel component with layout animations using Framer Motion.",
    imagePath: "/components/carousel.png",
    videoSrc: "https://assets.amarn.me/carousel2.mp4",
    link: "/components/carousels/carousel",
    category: "Carousels",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Dock",
    description:
      "A navigation dock component with smooth animations and hover effects, perfect for desktop interfaces.",
    imagePath: "/components/navigation/dock.png",
    videoSrc: "https://assets.amarn.me/dock2.mp4",
    link: "/components/navigation/dock",
    category: "Navigation",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Slide Up Button",
    description:
      "A collection of interactive and animated buttons for your applications.",
    imagePath: "/components/slide-up-button.png",
    videoSrc: "https://assets.amarn.me/slide-up-button.mp4",
    link: "/components/buttons/slideup-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Hover Arrow Button",
    description:
      "A button with a smooth hover swap animation where the arrow slides from left to right.",
    imagePath: "/components/buttons/hover-arrow-button.png",
    videoSrc: "https://assets.amarn.me/hover-arrow-button.mp4",
    link: "/components/buttons/hover-arrow-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },
  {
    title: "Focus Button",
    description:
      "A collection of interactive and animated buttons for your applications.",
    imagePath: "/components/buttons/focus-button.png",
    videoSrc: "https://assets.amarn.me/focus-button.mp4",
    link: "/components/buttons/focus-button",
    category: "Buttons",
    bgColor: "bg-black dark:bg-black",
  },

  {
    title: "Feature Steps",
    description:
      "A dynamic feature showcase with auto-playing steps and synchronized image transitions.",
    imagePath: "/components/features-step.png",
    videoSrc: "https://assets.amarn.me/features-section.mp4",
    link: "/components/sections/feature-steps",
    category: "Sections",
    bgColor: "bg-black dark:bg-black",
  },
];
