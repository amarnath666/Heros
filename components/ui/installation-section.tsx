"use client";

import { useState } from "react";
import CodeBlock from "@/components/ui/code-block";
import CopyButton from "@/components/ui/copy-button";
import AnimatedTabs from "@/components/ui/animated-tabs";
import PackageManagerSelector, {
  PackageManager,
} from "@/components/ui/package-manager-selector";

import { InstallationSectionProps } from "@/lib/types";
import { captureEvent } from "@/lib/analytics";

type InstallMethod = "cli" | "manual";

export default function InstallationSection({
  componentSource,
  dependencies = ["motion"],
  componentName = "component",
}: InstallationSectionProps) {
  const [installMethod, setInstallMethod] = useState<InstallMethod>("cli");
  const [activePm, setActivePm] = useState<PackageManager>("npm");

  const getCliCommand = (pm: PackageManager, name: string) => {
    const url = `https://chamaac.com/r/${name}.json`;
    switch (pm) {
      case "npm":
        return `npx shadcn@latest add ${url}`;
      case "bun":
        return `bunx shadcn@latest add ${url}`;
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${url}`;
      case "yarn":
        return `npx shadcn@latest add ${url}`;
    }
  };

  const getInstallCommand = (pm: PackageManager, deps: string[]) => {
    const depString = deps.join(" ");
    switch (pm) {
      case "npm":
        return `npm install ${depString}`;
      case "bun":
        return `bun add ${depString}`;
      case "pnpm":
        return `pnpm add ${depString}`;
      case "yarn":
        return `yarn add ${depString}`;
    }
  };

  const cliCommand = getCliCommand(activePm, componentName);
  const manualCommand = getInstallCommand(activePm, dependencies);

  const handleInstallMethodChange = (value: string) => {
    const method = value as InstallMethod;
    setInstallMethod(method);
    captureEvent("installation_method_selected", {
      component_name: componentName,
      method,
      surface: "component_installation",
    });
  };

  const handlePackageManagerChange = (packageManager: PackageManager) => {
    setActivePm(packageManager);
    captureEvent("package_manager_selected", {
      component_name: componentName,
      package_manager: packageManager,
      installation_method: installMethod,
      surface: "component_installation",
    });
  };

  return (
    <div className="">
      <h2 className="text-2xl/7 md:text-3xl/7 tracking-tight text-black dark:text-white mb-4 font-semibold">
        Installation
      </h2>

      {/* CLI/Manual Tabs */}
      <div className="mb-5 md:mb-15 mt-6">
        {/* Tab Headers */}
        <AnimatedTabs
          layoutId="activeInstallMethod"
          activeTab={installMethod}
          onTabChange={handleInstallMethodChange}
          tabs={[
            { label: "CLI", value: "cli" },
            { label: "Manual", value: "manual" },
          ]}
        />

        <div className="mt-4">
          {/* Tab Content */}
          {installMethod === "cli" ? (
            <div className="border border-white/15 rounded-[16px] overflow-hidden ">
              {/* Package Manager Selector + Copy */}
              <div className="bg-[#171717] p-2 border-b border-white/15 flex items-center justify-between">
                <PackageManagerSelector
                  activePm={activePm}
                  onPmChange={handlePackageManagerChange}
                  layoutId="cliPmBackground"
                />
                <CopyButton
                  text={cliCommand}
                  analytics={{
                    event: "cli_command_copied",
                    component_name: componentName,
                    package_manager: activePm,
                    command_purpose: "add_component",
                    surface: "component_installation",
                  }}
                />
              </div>

              {/* CLI Command */}
              <div className="bg-[#0d0d0d] p-4">
                <code className="text-sm font-mono text-neutral-200">
                  {cliCommand}
                </code>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Manual Installation Steps */}
              {dependencies.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-black dark:text-white  mb-4">
                    Step 1: Install Dependencies
                  </h4>

                  <div className="border border-white/15 rounded-[16px] overflow-hidden">
                    <div className="bg-[#171717] p-2 flex items-center justify-between">
                      <PackageManagerSelector
                        activePm={activePm}
                        onPmChange={handlePackageManagerChange}
                        layoutId="manualPmBackground"
                      />
                      <CopyButton
                        text={manualCommand}
                        analytics={{
                          event: "dependency_command_copied",
                          component_name: componentName,
                          package_manager: activePm,
                          command_purpose: "install_dependencies",
                          surface: "component_installation",
                        }}
                      />
                    </div>
                    <div className="bg-[#0d0d0d] border-t border-white/15 p-4">
                      <code className="text-sm font-mono text-neutral-200">
                        {manualCommand}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {/* Component Code */}
              <div>
                <div>
                  <h4 className="text-lg font-medium text-black dark:text-white mb-4">
                    Step {dependencies.length > 0 ? 2 : 1}: Copy and paste the
                    component code into your project.
                  </h4>
                </div>
                <CodeBlock
                  code={componentSource}
                  language="tsx"
                  filename={`${componentName}.tsx`}
                  copyAnalytics={{
                    event: "component_code_copied",
                    component_name: componentName,
                    surface: "component_installation",
                    filename: `${componentName}.tsx`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
