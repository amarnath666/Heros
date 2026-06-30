"use client";

import {
  IconBrightness,
  IconBrandX,
  IconSearch,
  IconBrandGithub,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  useScroll,
  useMotionValueEvent,
  m,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "motion/react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarData } from "@/lib/data";
import { IconButton } from "@/components/ui/icon-button";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/components/get-started", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/favourites", label: "Favourites" },
  {
    href: "https://github.com/sponsors/amarnathdhumal",
    label: "Sponsor",
    external: true,
  },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolledBeyondViewport, setIsScrolledBeyondViewport] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolledBeyondViewport(latest > 0);
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-bg-primary transition-all duration-300 ${
          pathname !== "/" || isScrolledBeyondViewport
            ? " border-b border-gray-200 dark:border-neutral-800"
            : ""
        }`}
      >
        <div className="flex justify-between items-center max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4">
          <div className="flex items-center gap-4 md:gap-8 flex-row relative z-10">
            <Link
              href="/"
              className="flex flex-row items-center gap-[8px] focus:outline-none focus-visible:outline-none"
            >
              <div className="bg-black dark:bg-white p-1 rounded-[8px]">
                <Logo />
              </div>
              <div>
                <p className="font-bold text-[20px] leading-none tracking-normal hidden lg:block ">
                  Chamaac UI
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm/5 md:text-base/7 text-black dark:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center gap-6 flex-row relative z-10">
            {/* search input */}
            <button
              onClick={() => setOpen(true)}
              className="flex justify-between items-center gap-2 px-2 md:px-3 py-2 text-sm hover:bg-bg-tertiary rounded-[12px] border border-border transition-colors bg-bg-secondary cursor-pointer text-text-secondary lg:min-w-[250px]"
            >
              <div className="flex items-center gap-[10px]">
                <IconSearch size={16} />
                <span className="text-sm/5">Search Components</span>
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-[5px] border bg-transparent p-2 text-[12px] text-text-secondary opacity-100">
                <span className="">⌘</span>K
              </kbd>
            </button>

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
              <TooltipContent sideOffset={8}>Star us on GitHub</TooltipContent>
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

            <Tooltip>
              <TooltipTrigger onClick={toggleTheme} asChild>
                <IconBrightness
                  size={20}
                  className="text-text-secondary hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>Toggle Theme</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Navigation - Only search, GitHub, and menu */}
          <div className="flex lg:hidden items-center gap-2 flex-row relative z-10">
            {/* Search button */}
            <IconButton
              onClick={() => setOpen(true)}
              className="size-9 rounded-[12px] bg-bg-primary"
            >
              <IconSearch size={18} />
            </IconButton>

            {/* GitHub button */}
            <IconButton
              onClick={() =>
                window.open(
                  "https://github.com/amarnathdhumal/chamaacui",
                  "_blank"
                )
              }
              className="size-9 rounded-[12px] bg-bg-primary"
            >
              <IconBrandGithub size={18} />
            </IconButton>

            {/* Hamburger Menu */}
            <IconButton
              onClick={() => setIsMobileMenuOpen(true)}
              className="size-9 rounded-[12px] bg-bg-primary text-black dark:text-white"
            >
              <IconMenu2 size={22} />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex lg:hidden"
            >
              {/* Sidebar Menu */}
              <m.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="w-full min-h-screen flex flex-col py-4 px-4 overflow-y-auto relative bg-bg-primary"
              >
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-row items-center gap-[8px]"
                  >
                    <div className="bg-black dark:bg-white p-1 rounded-[8px]">
                      <Logo />
                    </div>
                    <p className="font-bold text-[20px] leading-none tracking-tight text-black dark:text-white">
                      Chamaac UI
                    </p>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-1 text-text-secondary cursor-pointer"
                  >
                    <span className="text-sm">Close</span>
                    <IconX size={20} />
                  </button>
                </div>

                {/* Navigation Menu */}
                <div className="flex flex-col flex-1 mt-12">
                  <ul>
                    {navLinks.map((link) => (
                      <li
                        key={link.href}
                        className="border-b border-gray-200 dark:border-neutral-800 -mx-4"
                      >
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="block font-medium px-4 py-4 text-black dark:text-white text-[24px] leading-none tracking-tight transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li className="border-b border-gray-200 dark:border-neutral-800 -mx-4">
                      <button
                        onClick={() => {
                          window.open("https://x.com/AmarnathDhumal", "_blank");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left font-medium px-4 py-4 text-black dark:text-white text-[24px] leading-none tracking-tight transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
                      >
                        Twitter / X
                      </button>
                    </li>
                    <li className="border-b border-gray-200 dark:border-neutral-800 -mx-4">
                      <button
                        onClick={() => {
                          toggleTheme();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between w-full font-medium px-4 py-4 text-black dark:text-white text-[24px] leading-none tracking-tight transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
                      >
                        <span>Toggle Theme</span>
                        <IconBrightness
                          size={24}
                          className="text-text-secondary"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-[16px] border-gray-200 dark:border-neutral-800"
      >
        <CommandInput
          className=" py-2 text-sm/5 text-text-secondary "
          placeholder="Type a command or search..."
        />
        <CommandList className="bg-transparent ">
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(
            sidebarData.reduce(
              (acc, item) => {
                const category = item.category || "Other";
                if (!acc[category]) acc[category] = [];
                acc[category].push(item);
                return acc;
              },
              {} as Record<string, typeof sidebarData>
            )
          )
            .filter(([category]) => category !== "Overview")
            .map(([category, items]) => {
              const filteredItems = items.filter(
                (item) => !item.componentName.includes("Overview")
              );
              return { category, items: filteredItems };
            })
            .filter(({ items }) => items.length > 0)
            .map(({ category, items }) => (
              <CommandGroup key={category} heading={category}>
                {items.map((item) =>
                  item.link ? (
                    <CommandItem
                      key={item.componentName}
                      value={item.componentName}
                      onSelect={() => {
                        runCommand(() =>
                          router.push(`/components${item.link}`)
                        );
                      }}
                      className="text-sm/5 !py-2 cursor-pointer"
                    >
                      {item.componentName}
                    </CommandItem>
                  ) : null
                )}
              </CommandGroup>
            ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
