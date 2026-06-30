"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import AnimatedTabs from "@/components/ui/animated-tabs";
import PackageManagerSelector, {
  PackageManager,
} from "@/components/ui/package-manager-selector";
import CopyButton from "@/components/ui/copy-button";
import CodeBlock from "@/components/ui/code-block";
import { captureEvent, type CopyAnalytics } from "@/lib/analytics";

type InstallMethod = "cli" | "manual" | "mcp";

const mcpRegistryCode = `{
  "registries": {
    "@chamaac": "https://chamaac.com/r/{name}.json"
  }
}`;

const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const usageCode = `import SlideUpButton from "@/components/ui/slideup-button";

export default function MyPage() {
  return (
    <SlideUpButton className="px-6 py-3 bg-black text-white">
      Click Me
    </SlideUpButton>
  );
}`;

// ─── Helpers ────────────────────────────────────────────────────────────────

function getPmPrefix(pm: PackageManager) {
  switch (pm) {
    case "npm":
      return "npx";
    case "bun":
      return "bunx";
    case "pnpm":
      return "pnpm dlx";
    case "yarn":
      return "npx";
  }
}

// ─── Reusable command block UI ───────────────────────────────────────────────

interface CommandBlockProps {
  command: string;
  /** Shows a PackageManagerSelector on the left */
  activePm?: PackageManager;
  onPmChange?: (pm: PackageManager) => void;
  layoutId?: string;
  /** Plain text label shown on the left when no PM selector */
  label?: string;
  copyAnalytics: CopyAnalytics;
}

function CommandBlock({
  command,
  activePm,
  onPmChange,
  layoutId,
  label,
  copyAnalytics,
}: CommandBlockProps) {
  return (
    <div className="border border-white/15 rounded-[16px] overflow-hidden">
      <div className="bg-[#171717] p-2 flex items-center justify-between">
        {activePm && onPmChange && layoutId ? (
          <PackageManagerSelector
            activePm={activePm}
            onPmChange={onPmChange}
            layoutId={layoutId}
          />
        ) : label ? (
          <span className="text-[14px] text-text-tertiary font-mono tracking-tight select-none px-2">
            {label}
          </span>
        ) : (
          <div />
        )}
        <CopyButton text={command} analytics={copyAnalytics} />
      </div>
      <div className="bg-[#0d0d0d] p-4">
        <code className="text-sm font-mono text-neutral-200">{command}</code>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GetStartedClient() {
  const [installMethod, setInstallMethod] = useState<InstallMethod>("cli");
  const [activePm, setActivePm] = useState<PackageManager>("npm");

  const cliCommand = `${getPmPrefix(activePm)} shadcn@latest init`;
  const manualCommand = (() => {
    const deps = "motion clsx tailwind-merge";
    switch (activePm) {
      case "npm":
        return `npm install ${deps}`;
      case "bun":
        return `bun add ${deps}`;
      case "pnpm":
        return `pnpm add ${deps}`;
      case "yarn":
        return `yarn add ${deps}`;
    }
  })();
  const addCommand = `${getPmPrefix(activePm)} shadcn@latest add https://chamaac.com/r/<Component>.json`;
  const mcpCommand = `${getPmPrefix(activePm)} shadcn@latest mcp init`;

  const handleInstallMethodChange = (value: string) => {
    const method = value as InstallMethod;
    setInstallMethod(method);
    captureEvent("installation_method_selected", {
      method,
      surface: "get_started",
    });
  };

  const handlePackageManagerChange = (packageManager: PackageManager) => {
    setActivePm(packageManager);
    captureEvent("package_manager_selected", {
      package_manager: packageManager,
      installation_method: installMethod,
      surface: "get_started",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-bg-primary overflow-x-hidden flex flex-col">
      <main className="flex-1">
        <div className="max-w-3xl">
          {/* Hero */}
          <h1 className="text-[2rem]/10 md:text-[2.5rem]/10 font-semibold tracking-tight text-black dark:text-white">
            Get Started
          </h1>
          <p className="text-base/5 md:text-lg/7 text-text-secondary tracking-tight mt-2 md:mt-4 mb-10 max-w-[750px]">
            Welcome to Chamaac UI! This guide will help you set up and start
            using our beautiful, animated components in your project.
          </p>

          {/* Installation Section */}
          <section className="mb-10 md:mb-15">
            <h2 className="text-2xl/7 md:text-3xl/7 tracking-tight text-black dark:text-white mb-4 font-semibold">
              Installation
            </h2>

            <div className="mb-5 md:mb-10 mt-6">
              <AnimatedTabs
                layoutId="getStartedInstallMethod"
                activeTab={installMethod}
                onTabChange={handleInstallMethodChange}
                tabs={[
                  { label: "CLI", value: "cli" },
                  { label: "Manual", value: "manual" },
                  { label: "MCP", value: "mcp" },
                ]}
              />

              <div className="mt-4">
                {/* ── CLI ── */}
                {installMethod === "cli" && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 1: Initialize shadcn/ui (if not already done)
                      </h4>
                      <CommandBlock
                        command={cliCommand}
                        activePm={activePm}
                        onPmChange={handlePackageManagerChange}
                        layoutId="getStartedCliPm"
                        copyAnalytics={{
                          event: "cli_command_copied",
                          package_manager: activePm,
                          command_purpose: "initialize_shadcn",
                          surface: "get_started",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 2: Add components from Chamaac UI
                      </h4>
                      <p className="text-base/6 text-text-secondary mb-4">
                        Browse our components and use the CLI command shown on
                        each component page to add it to your project.
                      </p>
                      <CommandBlock
                        command={addCommand}
                        label="shadcn@latest add"
                        copyAnalytics={{
                          event: "cli_command_copied",
                          package_manager: activePm,
                          command_purpose: "add_component_template",
                          surface: "get_started",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Manual ── */}
                {installMethod === "manual" && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 1: Install Dependencies
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Most Chamaac UI components use{" "}
                        <code className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-sm font-mono">
                          motion/react
                        </code>{" "}
                        for animations.
                      </p>
                      <CommandBlock
                        command={manualCommand}
                        activePm={activePm}
                        onPmChange={handlePackageManagerChange}
                        layoutId="getStartedManualPm"
                        copyAnalytics={{
                          event: "dependency_command_copied",
                          package_manager: activePm,
                          command_purpose: "install_base_dependencies",
                          surface: "get_started",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 2: Add the cn utility
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Create a{" "}
                        <code className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-sm font-mono">
                          lib/utils.ts
                        </code>{" "}
                        file with the following helper function:
                      </p>
                      <CodeBlock
                        code={utilsCode}
                        filename="lib/utils.ts"
                        language="tsx"
                        copyAnalytics={{
                          event: "configuration_copied",
                          surface: "get_started",
                          filename: "lib/utils.ts",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 3: Copy the component
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Browse our components, find one you like, and copy the
                        source code into{" "}
                        <code className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-sm font-mono">
                          components/ui
                        </code>
                        .
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 4: Import and use
                      </h4>
                      <CodeBlock
                        code={usageCode}
                        filename="app/page.tsx"
                        language="tsx"
                        copyAnalytics={{
                          event: "code_snippet_copied",
                          surface: "get_started",
                          filename: "app/page.tsx",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* ── MCP ── */}
                {installMethod === "mcp" && (
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-base/6 text-text-secondary mb-4">
                        MCP (Model Context Protocol) allows AI assistants to
                        understand and work with Chamaac UI components directly
                        in your IDE. Set it up once and use natural language to
                        add components to your project.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 1: Initialize MCP
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Run this command to set up the shadcn MCP server for
                        your AI client (Cursor, Claude Code, etc.):
                      </p>
                      <CommandBlock
                        command={mcpCommand}
                        activePm={activePm}
                        onPmChange={handlePackageManagerChange}
                        layoutId="getStartedMcpPm"
                        copyAnalytics={{
                          event: "cli_command_copied",
                          package_manager: activePm,
                          command_purpose: "initialize_mcp",
                          surface: "get_started",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 2: Add Chamaac UI Registry
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Add the Chamaac UI registry to your{" "}
                        <code className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-sm font-mono">
                          components.json
                        </code>{" "}
                        file so the AI can access all components:
                      </p>
                      <CodeBlock
                        code={mcpRegistryCode}
                        filename="components.json"
                        language="json"
                        copyAnalytics={{
                          event: "configuration_copied",
                          surface: "get_started",
                          filename: "components.json",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                        Step 3: Use with your AI assistant
                      </h4>
                      <p className="text-base/5 text-text-secondary mb-4">
                        Now you can ask your AI assistant to add components
                        using natural language:
                      </p>
                      <div className="p-4 rounded-[16px] border border-white/15 bg-[#0d0d0d]">
                        <p className="text-neutral-300">
                          &quot;Add the SlideUpButton component from Chamaac
                          UI&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-10 md:mb-20">
            <h2 className="text-[1.5rem]/8 md:text-[2rem]/10 font-semibold tracking-tight text-black dark:text-white">
              Next Steps
            </h2>
            <p className="text-base/6 md:text-lg/7 text-text-secondary tracking-tight mt-2 mb-4 max-w-[750px]">
              You&apos;re all set! Here&apos;s what you can do next.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/components"
                className="group p-4 rounded-[15px] border border-border transition-colors"
              >
                <h3 className="text-lg font-medium text-black dark:text-white mb-2 group-hover:underline flex gap-2 items-center">
                  Browse Components
                  <IconArrowRight className="size-5" />
                </h3>
                <p className="text-text-secondary text-sm">
                  Explore our collection of animated UI components.
                </p>
              </Link>
              <a
                href="https://github.com/amarnathdhumal/chamaacui"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-[15px] border border-border transition-colors"
              >
                <h3 className="text-lg font-medium text-black dark:text-white mb-2 group-hover:underline flex gap-2 items-center">
                  <IconBrandGithub size={20} />
                  GitHub Repository
                  <IconArrowRight className="size-5" />
                </h3>
                <p className="text-text-secondary text-sm">
                  Star the repo, report issues, or contribute.
                </p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
