"use client";

import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { CopyProps } from "@/lib/types";
import { captureCopyFailure, captureEvent } from "@/lib/analytics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyButton = ({ text, analytics }: CopyProps) => {
  const [copy, setCopy] = useState<boolean>(false);

  // handle copy
  const handleCopy = async () => {
    const copyAnalytics =
      analytics ??
      ({
        event: "code_snippet_copied",
        surface: "generic_copy_button",
      } as const);

    try {
      await navigator.clipboard.writeText(text);
      const { event, ...properties } = copyAnalytics;
      captureEvent(event, properties);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch {
      const { event, ...properties } = copyAnalytics;
      captureCopyFailure(event, properties);
    }
  };

  return (
    <button
      type="button"
      aria-label={copy ? "Copied" : "Copy to clipboard"}
      onClick={handleCopy}
      className="h-[30px] w-[30px] flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 cursor-pointer rounded-md transition shadow-sm border border-white/15"
    >
      {copy ? (
        <IconCheck className="text-white size-4" />
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <IconCopy className="text-white size-4" />
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Copy</p>
          </TooltipContent>
        </Tooltip>
      )}
    </button>
  );
};

export default CopyButton;
