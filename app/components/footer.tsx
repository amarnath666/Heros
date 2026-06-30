"use client";

import Link from "next/link";
import { sidebarData } from "@/lib/data";
import { IconBrandX, IconBrandGithub, IconHeart } from "@tabler/icons-react";
import { Logo } from "@/components/ui/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Footer = () => {
  const shaders = sidebarData.filter((item) => item.isShader);
  const featuredComponents = [
    "AI Input",
    "How It Works",
    "Text Loop",
    "Stats Cards",
    "Gauge",
    "Gif Text",
    "Premium Button",
    "Glowing Border",
    "Feature Steps",
  ];

  const components = sidebarData.filter((item) =>
    featuredComponents.includes(item.componentName)
  );

  const categories = Array.from(
    new Set(
      sidebarData
        .map((item) => item.category)
        .filter(
          (category): category is string =>
            typeof category === "string" &&
            !["Overview", "Animated Icons"].includes(category)
        )
    )
  );

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-12">
      <footer className="w-full bg-secondary pt-4 md:pt-12 mb-5 md:mb-12 rounded-[16px]">
        <div className=" flex flex-col gap-4 md:gap-12 px-4 md:px-8 lg:px-12 pb-4 md:pb-8">
          {/* Top Section: Logo & Description */}
          <div className="flex flex-col ">
            <div className="flex flex-col ">
              <Link href="/" className="flex items-center gap-2 group w-fit">
                <div className="bg-black dark:bg-white p-1 rounded-[8px] transition-transform group-hover:scale-105">
                  <Logo />
                </div>
                <span className="font-bold text-xl tracking-tight text-black dark:text-white">
                  Chamaac UI
                </span>
              </Link>
              <div className="flex flex-col ">
                <p className="text-text-tertiary text-base leading-tight tracking-normal max-w-[400px] mt-6">
                  Premium UI components and shader backgrounds to make your
                  interfaces stand out.
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() =>
                        window.open(
                          "https://github.com/amarnathdhumal/chamaacui",
                          "_blank"
                        )
                      }
                      asChild
                    >
                      <IconBrandGithub
                        size={20}
                        className="text-text-secondary hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>
                      Star us on GitHub
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger
                      onClick={() =>
                        window.open("https://x.com/AmarnathDhumal", "_blank")
                      }
                      asChild
                    >
                      <IconBrandX
                        size={20}
                        className="text-text-secondary hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>Twitter / X</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Link Columns */}
          <div className="flex flex-row gap-4 md:gap-8 md:gap-[150px] pt-4 md:pt-8  border-t border-border">
            {/* Shaders Column */}
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-text-primary text-base font-semibold uppercase">
                Shaders
              </h3>
              <ul className="flex flex-col gap-[4px] md:gap-[10px]">
                {shaders.map((shader) => (
                  <li key={shader.link}>
                    <Link
                      href={`/components${shader.link}`}
                      className="text-text-tertiary text-[12px] md:text-sm  font-medium hover:text-text-primary uppercase tracking-wide"
                    >
                      {shader.componentName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Components Column */}
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-text-primary text-base font-semibold uppercase">
                Components
              </h3>
              <ul className="flex flex-col gap-[4px] md:gap-[10px]">
                {components.map((component) => (
                  <li key={component.componentName}>
                    <Link
                      href={`/components${component.link}`}
                      className="text-text-tertiary text-[12px] md:text-sm font-medium hover:text-text-primary uppercase tracking-wide"
                    >
                      {component.componentName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Column */}
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-text-primary text-base font-semibold uppercase">
                Categories
              </h3>
              <ul className="flex flex-col gap-[4px] md:gap-[10px]">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/components/${category.toLowerCase().replaceAll(" ", "-")}`}
                      className="text-text-tertiary text-[12px] md:text-sm  font-medium hover:text-text-primary uppercase tracking-[0.02em]"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto border-t border-border px-4 md:px-8 lg:px-12 py-4  md:py-6 w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <p className="text-text-tertiary text-sm text-center md:text-left flex items-center gap-1 group">
            Built with Love by
            <Link
              href="https://x.com/AmarnathDhumal"
              target="_blank"
              className="text-black dark:text-white underline font-medium"
            >
              Amarnath
            </Link>
          </p>
          <p className="text-text-tertiary text-sm">
            Star the project on{" "}
            <Link
              href="https://github.com/amarnathdhumal/chamaacui"
              target="_blank"
              className="text-black dark:text-white underline font-medium"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};
