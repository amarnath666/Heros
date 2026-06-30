"use client";

import { sidebarData } from "@/lib/data";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { m, LazyMotion, domMax } from "motion/react";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  // Group items by category
  const groupedData = sidebarData.reduce(
    (acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, typeof sidebarData>
  );

  return (
    <LazyMotion features={domMax}>
      <div className="min-w-45 max-w-45 h-[calc(100vh-120px)] flex flex-col sticky top-[114px] overflow-y-auto hide-scrollbar pb-10 ">
        <ul className="flex flex-col gap-4">
          {Object.entries(groupedData).map(([category, items]) => (
            <li key={category} className="flex flex-col gap-4">
              {items.some((item) => item.componentName === category) ? (
                <Link
                  href={`/components${items.find((item) => item.componentName === category)?.link}`}
                  className="text-base/7 md:text-lg/7 font-medium text-black dark:text-white  tracking-tight hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {category}
                </Link>
              ) : (
                <h3 className="text-base/7 md:text-lg/7 uppercase font-semibold text-black dark:text-white ">
                  {category}
                </h3>
              )}
              <ul className="flex flex-col gap-2 border-l border-neutral-200 dark:border-neutral-800 ">
                {items
                  .filter((item) => item.componentName !== category)
                  .map((item) => {
                    const href =
                      item.link === ""
                        ? "/components"
                        : `/components${item.link}`;
                    const isActive =
                      item.link === ""
                        ? pathname === "/components"
                        : `/components${item.link}` === pathname;
                    const itemId = item.link || "introduction";
                    const isHovered = hoveredItem === itemId;

                    return (
                      <li
                        key={itemId}
                        className="relative pl-4 py-0.5"
                        onMouseEnter={() => setHoveredItem(itemId)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {isActive && (
                          <m.div
                            layoutId="active-sidebar-line"
                            className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-black dark:bg-white"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        {isHovered && !isActive && (
                          <m.div
                            layoutId="hover-sidebar-line"
                            className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-neutral-300 dark:bg-neutral-700"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                        <Link
                          href={href}
                          className={cn(
                            "cursor-pointer font-medium uppercase text-sm/5 flex flex-row items-center hover:text-black dark:hover:text-white hover:font-medium",
                            `${isActive ? "text-black dark:text-white " : "text-text-secondary"}`
                          )}
                        >
                          {item.componentName}
                          {item.isNew && (
                            <span className="ml-2 text-[10px] bg-[#adfa1d] text-black px-1.5 py-1 rounded-[8px] leading-none font-medium">
                              New
                            </span>
                          )}
                          {item.isUpdated && (
                            <span className="ml-2 text-[10px] bg-[#adfa1d] text-black px-1.5 py-1 rounded-[8px] leading-none font-medium">
                              Updated
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </LazyMotion>
  );
};

export default Sidebar;
