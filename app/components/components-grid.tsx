"use client";

import { componentCards } from "@/lib/data";
import Link from "next/link";
import { m, LazyMotion, domAnimation } from "motion/react";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { IconStar, IconStarFilled, IconTrash } from "@tabler/icons-react";
import { useFavourites } from "@/hooks/use-favourites";
import { IconButton } from "@/components/ui/icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ComponentCard = ({
  component,
  isFavouritesPage = false,
}: {
  component: (typeof componentCards)[0];
  isFavouritesPage?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { favourites, toggleFavourite, isMounted } = useFavourites();
  const isFavorite = favourites.includes(component.link);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsVideoReady(false);
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div>
        <Link href={component.link}>
          <m.div
            className={cn(
              "group relative h-full rounded-[16px] border border-border p-2",
              "bg-bg-secondary",
              "overflow-hidden cursor-pointer",
              "transition-all duration-300"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Media Container */}
            <div
              className={cn(
                "relative w-full aspect-video rounded-[12px] overflow-hidden",
                component.bgColor
              )}
            >
              {/* Static image — always present as the base thumbnail */}
              <Image
                src={component.imagePath}
                alt={component.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              {/* Video — loads only on hover, fades in over the image when ready */}
              {component.videoSrc && (
                <video
                  ref={videoRef}
                  src={component.videoSrc}
                  loop
                  muted
                  playsInline
                  preload="none"
                  onLoadedData={() => setIsVideoReady(true)}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover border-none outline-none",
                    "transition-opacity duration-500",
                    isHovered && isVideoReady ? "opacity-100" : "opacity-0"
                  )}
                />
              )}

              {/* Favourite target overlay - only visible on hover */}
              {isMounted && (
                <div className="absolute top-[5px] right-[5px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavourite(component.link);
                        }}
                        className="absolute top-2 right-2 z-10 size-7"
                      >
                        {isFavouritesPage ? (
                          <IconTrash className="size-[16px] text-red-500 hover:text-red-600" />
                        ) : isFavorite ? (
                          <IconStarFilled className="size-[16px] text-[#FFA41C]" />
                        ) : (
                          <IconStar className="size-[16px]" />
                        )}
                      </IconButton>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">
                        {isFavouritesPage
                          ? "Remove from Favourites"
                          : isFavorite
                            ? "Remove from Favourites"
                            : "Save to Favourites"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="pb-2 pt-4 px-2 md:px-2">
              <h3 className="text-2xl leading-none font-semibold text-black dark:text-white mb-2 md:mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors tracking-[-0.01em]">
                {component.title}
              </h3>
              <p className="text-sm/5 text-text-secondary tracking-wide">
                {component.description}
              </p>
            </div>
          </m.div>
        </Link>
      </m.div>
    </LazyMotion>
  );
};

interface ComponentsGridProps {
  title?: string;
  description?: string;
  category?: string;
}

const ComponentsGrid = ({
  title = "Components",
  description = "A collection of interactive and animated components for your applications.",
  category,
}: ComponentsGridProps) => {
  const components = category
    ? componentCards.filter((component) => component.category === category)
    : componentCards;

  return (
    <div className="flex flex-col w-full pb-20 ">
      <h1 className="text-[2rem]/10 md:text-[2.5rem]/10 font-semibold tracking-tight text-black dark:text-white mb-3">
        {title}
      </h1>
      <p className="text-base/5 md:text-lg/7 text-text-secondary tracking-tight mb-5 md:mb-10 max-w-[750px]">
        {description}
      </p>

      {/* Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
        {components.map((component) => (
          <ComponentCard key={component.link} component={component} />
        ))}
      </div>
    </div>
  );
};

export default ComponentsGrid;
