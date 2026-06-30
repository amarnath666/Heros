"use client";

import Link from "next/link";
import { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { IconCopy, IconCheck, IconTerminal2 } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconTypes } from "./types";
import { captureCopyFailure, captureEvent } from "@/lib/analytics";

interface IconCardProps {
  icon: IconTypes;
  isHoveredMode: boolean;
}

export default function IconCard({ icon, isHoveredMode }: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isCopyingCode, setIsCopyingCode] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);

  const cliCommand = `npx shadcn@latest add "https://chamaac.com/r/${icon.slug}.json"`;

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCopyingCode(true);
    try {
      const response = await fetch(`/r/${icon.slug}.json`);
      const data = await response.json();
      if (data.files && data.files[0]?.content) {
        await navigator.clipboard.writeText(data.files[0].content);
        captureEvent("component_code_copied", {
          component_name: icon.slug,
          surface: "animated_icon_card",
        });
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy code:", error);
      captureCopyFailure("component_code_copied", {
        component_name: icon.slug,
        surface: "animated_icon_card",
      });
    } finally {
      setIsCopyingCode(false);
    }
  };

  const handleCopyCli = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(cliCommand);
      captureEvent("cli_command_copied", {
        component_name: icon.slug,
        package_manager: "npm",
        command_purpose: "add_component",
        surface: "animated_icon_card",
      });
      setCliCopied(true);
      setTimeout(() => setCliCopied(false), 2000);
    } catch {
      captureCopyFailure("cli_command_copied", {
        component_name: icon.slug,
        package_manager: "npm",
        command_purpose: "add_component",
        surface: "animated_icon_card",
      });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <Link
        href={icon.href}
        className="group block"
        onClick={() =>
          captureEvent("component_opened", {
            component_name: icon.slug,
            surface: "animated_icon_card",
          })
        }
      >
        <m.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex flex-col items-center justify-center  rounded-[16px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-colors h-[180px]"
        >
          {/* Hover action buttons */}
          <AnimatePresence>
            {isHovered && (
              <m.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-3 right-3 flex gap-1.5"
              >
                {/* Copy Code Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      {codeCopied ? (
                        <IconCheck className="size-4 dark:text-white text-black" />
                      ) : isCopyingCode ? (
                        <Loader2 className="size-4 animate-spin text-text-secondary" />
                      ) : (
                        <IconCopy className="size-4 text-text-secondary" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{codeCopied ? "Copied!" : "Copy Code"}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Copy CLI Command Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopyCli}
                      className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    >
                      {cliCopied ? (
                        <IconCheck className="size-4 dark:text-white text-black" />
                      ) : (
                        <IconTerminal2 className="size-4 text-text-secondary" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{cliCopied ? "Copied!" : "Copy CLI Command"}</p>
                  </TooltipContent>
                </Tooltip>
              </m.div>
            )}
          </AnimatePresence>

          <div className="mb-4 text-black dark:text-white  transition-transform duration-300">
            <icon.component size={40} isHovered={isHoveredMode} />
          </div>
          <span className="text-sm font-medium text-neutral-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
            {icon.name}
          </span>
        </m.div>
      </Link>
    </LazyMotion>
  );
}
