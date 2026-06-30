import type { Metadata } from "next";
import { Header } from "./components/header";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: undefined,
  description:
    "Explore a premium collection of high-performance shader components, interactive backgrounds, and modern UI elements crafted with React and GLSL.",
  pathname: "/",
});
import Link from "next/link";
import TextLoop from "./components/text-animations/text-loop/text-loop";
import VideoBentoGrid from "../components/ui/video-bento-grid";
import { IconBrandGithub } from "@tabler/icons-react";
import { PrimaryButton } from "@/components/ui/primary-button";

import { Footer } from "./components/footer";
import { FAQ } from "./components/faq";
import { Reviews } from "./components/reviews";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full dark:bg-black bg-white overflow-x-hidden flex flex-col">
      <Header />

      <div className="flex flex-col lg:flex-row justify-center mt-[100px] md:mt-[150px] mb-[30px] lg:mb-0 flex-1 z-10 relative w-full gap-8 md:gap-12 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
        {/* Content Section */}
        <div className="flex flex-col items-start sm:items-center">
          {/* Mobile Static Heading */}
          <h1 className="text-7xl font-semibold text-left text-black dark:text-white leading-[0.95] tracking-tighter sm:hidden mb-2">
            Make your UI Shine.
          </h1>

          {/* Desktop/Tablet Animated Heading */}
          <TextLoop
            className="hidden sm:flex"
            staticTextClassName="text-6xl lg:text-7xl xl:text-8xl font-semibold text-left text-black dark:text-white leading-[0.95] tracking-tighter"
            rotatingTextClassName="text-6xl lg:text-7xl xl:text-8xl font-semibold text-left leading-[0.95] tracking-tighter bg-gradient-to-r from-neutral-600 to-black dark:from-neutral-400 dark:to-white text-black dark:text-white"
            cursorClassName="sm:h-[3.8rem] md:h-[4.5rem]  xl:h-[5.7rem] bg-black dark:bg-white"
            backgroundClassName="bg-gradient-to-r from-transparent via-neutral-300/50 to-neutral-400/80 dark:from-transparent dark:via-neutral-700/50 dark:to-neutral-600/80"
            staticText="Make your UI"
            rotatingTexts={["Shine.", "Pop.", "Glow."]}
          />

          <p className="text-base/5 md:text-lg/6 text-left sm:text-center text-neutral-600 dark:text-gray-300 my-5 md:my-[30px] max-w-[650px]">
            A premium collection of high-performance shader backgrounds and
            interactive UI components designed to make your web presence
            unforgettable.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/components" className="w-fit">
              <PrimaryButton>Explore Components</PrimaryButton>
            </Link>
            <Link
              href="https://github.com/amarnathdhumal/chamaacui"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit"
            >
              <PrimaryButton variant="secondary">
                <IconBrandGithub size={20} />
                Star us on GitHub
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Bento Grid */}
      <div className="px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <VideoBentoGrid />
      </div>

      <div className="pt-10 md:pt-[175px]">
        <Reviews />
      </div>
      <div className="pt-10 md:pt-[175px]">
        <FAQ />
      </div>
      <div className="pt-10 md:pt-[175px]">
        <Footer />
      </div>
    </div>
  );
}
