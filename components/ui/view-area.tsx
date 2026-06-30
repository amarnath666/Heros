"use client";

import { useState } from "react";
import TabButton from "./tab-button";
import {
  IconEye,
  IconCode,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFavourites } from "@/hooks/use-favourites";
import { IconButton } from "@/components/ui/icon-button";
import RefreshButton from "./refresh-button";
import CodeBlock from "./code-block";
// import DeviceSelector, { DeviceType } from "./device-selector";
import IframePreview from "./iframe-preview";
import { ViewAreaTypes } from "@/lib/types";
import { captureEvent } from "@/lib/analytics";

const ViewArea = ({
  title,
  description,
  preview,
  code,
  codeFilename,
  scrollContainerRef,
  className,
  onRefresh,
}: ViewAreaTypes) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const device: string = "desktop";
  const pathname = usePathname();
  const { favourites, toggleFavourite, isMounted } = useFavourites();
  const isFavorite = favourites.includes(pathname);

  const selectTab = (tab: "preview" | "code") => {
    setActiveTab(tab);
    captureEvent("component_view_tab_selected", {
      component_name: title,
      pathname,
      tab,
    });
  };

  const handleFavouriteToggle = () => {
    captureEvent("component_favourite_toggled", {
      component_name: title,
      pathname,
      action: isFavorite ? "removed" : "added",
    });
    toggleFavourite(pathname);
  };

  return (
    <div className="flex flex-col w-full h-full mb-10 md:mb-20 min-w-0 hide-scrollbar ">
      <h1 className="text-[2rem]/10 md:text-[2.5rem]/10 font-semibold tracking-tight text-black dark:text-white">
        {title}
      </h1>
      <p className="text-base/5 md:text-lg/7 text-text-secondary tracking-tight mt-3  mb-5 md:mb-10  max-w-[750px]">
        {description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-12 items-center justify-center rounded-[12px] bg-bg-secondary p-1 border border-border">
          <TabButton
            name="Preview"
            onClick={() => selectTab("preview")}
            isActive={activeTab === "preview"}
            icon={<IconEye className="size-5" />}
            layoutId={`viewAreaTab-${title}`}
          />
          <TabButton
            name="Code"
            onClick={() => selectTab("code")}
            isActive={activeTab === "code"}
            icon={<IconCode className="size-5" />}
            layoutId={`viewAreaTab-${title}`}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* {activeTab === "preview" && (
            <DeviceSelector device={device} setDevice={setDevice} />
          )} */}
          {isMounted && (
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton onClick={handleFavouriteToggle} className="size-8">
                  {isFavorite ? (
                    <IconStarFilled className="size-4 text-[#FFA41C]" />
                  ) : (
                    <IconStar className="size-4" />
                  )}
                </IconButton>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {isFavorite ? "Remove from Favourites" : "Save to Favourites"}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div
        className={cn(
          activeTab === "preview"
            ? "border border-border rounded-[16px] overflow-hidden transition-all duration-300 ease-in-out w-full"
            : "w-full",
          activeTab === "preview" && device === "tablet" ? "max-w-[768px]" : "",
          activeTab === "preview" && device === "mobile" ? "max-w-[393px]" : ""
        )}
      >
        {activeTab === "preview" ? (
          <div
            ref={scrollContainerRef}
            className={cn(
              "hide-scrollbar relative bg-bg-primary w-full h-full",
              device === "desktop" ? "overflow-y-auto" : "overflow-hidden",
              className
            )}
          >
            {onRefresh && (
              <div className="absolute top-4 right-4 z-10">
                <RefreshButton onRefresh={onRefresh} />
              </div>
            )}
            {device === "desktop" ? (
              preview
            ) : (
              <IframePreview>{preview}</IframePreview>
            )}
          </div>
        ) : (
          <div className="w-full">
            {typeof code === "string" ? (
              <CodeBlock
                code={code}
                filename={codeFilename}
                copyAnalytics={{
                  event: "code_snippet_copied",
                  component_name: title,
                  surface: "component_preview_code_tab",
                  filename: codeFilename,
                }}
              />
            ) : (
              code
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewArea;
