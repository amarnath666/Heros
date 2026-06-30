"use client";

import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import type { CopyAnalytics } from "@/lib/analytics";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  copyAnalytics?: CopyAnalytics;
}

const COLLAPSED_HEIGHT = 600;

export default function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  copyAnalytics,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const codeLines = code?.split("\n").length ?? 0;
  // Let's assume ~26 lines roughly fits in 600px
  const isHeightExceeded = codeLines > 26;

  const handleCollapse = () => {
    setIsExpanded(false);
    // When collapsing, optionally scroll back up to the top of the code block
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // If we've scrolled past the top of the code block, scroll back to it
      if (rect.top < 0) {
        window.scrollBy({
          top: rect.top - 100, // 100px offset for padding/header
          behavior: "instant", // Use instant scroll since we want NO animations
        });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col w-full bg-[#0d0d0d] rounded-[16px] border border-white/15 overflow-hidden shadow-2xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/15 bg-white/[0.03] backdrop-blur-md">
        <div className="flex items-center">
          {filename && (
            <span className="text-[14px] text-text-tertiary font-mono tracking-tight select-none">
              {filename}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white font-bold uppercase tracking-widest select-none border border-white/15">
            {language}
          </span>
          <div className="h-4 w-[1px] bg-white/10" />
          <CopyButton
            text={code}
            analytics={
              copyAnalytics ?? {
                event: "code_snippet_copied",
                surface: "code_block",
                filename,
              }
            }
          />
        </div>
      </div>

      {/* Code Content Area */}
      <div
        className="relative group w-full"
        style={{
          height:
            isHeightExceeded && !isExpanded ? `${COLLAPSED_HEIGHT}px` : "auto",
          overflow: "hidden", // Always clip content here so no layout bleeds
        }}
      >
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers={false}
            wrapLongLines={false}
            customStyle={{
              margin: 0,
              padding: "1.5rem 1rem",
              fontSize: "14px",
              lineHeight: "1.7",
              background: "transparent",
              width: "100%",
              maxWidth: "100%",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              },
            }}
          >
            {code}
          </SyntaxHighlighter>

          {/* Collapse button — at the very bottom of the opened code block */}
          {isHeightExceeded && isExpanded && (
            <div className="flex justify-center pb-8 pt-2">
              <button
                onClick={handleCollapse}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 backdrop-blur-xl text-[14px] text-white/80 font-medium transition-all hover:text-white cursor-pointer shadow-xl"
              >
                Collapse code
              </button>
            </div>
          )}
        </div>

        {/* Gradient + Expand button — only visible when explicitly collapsed */}
        {isHeightExceeded && !isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-center z-10"
            style={{
              background:
                "linear-gradient(to top, #0d0d0d 10%, rgba(13,13,13,0.85) 55%, transparent 100%)",
            }}
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="mb-6 z-20 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 backdrop-blur-xl text-[14px] text-white/80 font-medium transition-all hover:text-white pointer-events-auto shadow-xl cursor-pointer"
            >
              Expand code
            </button>
          </div>
        )}

        {/* A minimal bottom fade when it's a small codeblock NOT exceeding height */}
        {!isHeightExceeded && (
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0d0d0d]/50 to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
