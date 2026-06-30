"use client";

import { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Chamaac UI?",
    answer:
      "Chamaac UI is a premium collection of high-performance shader backgrounds and interactive UI components. It's designed for developers who want to add a touch of 'chamaac' (shine) to their web applications with minimal effort.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Absolutely. Chamaac UI is 100% open-source and released under the MIT license. This means you can freely use it for personal projects, freelance client work, or large-scale commercial applications without any restrictions.",
  },
  {
    question: "How do I install the components?",
    answer:
      "For the best experience, we recommend using our shadcn-compatible CLI for automated setup. If you prefer manual control, every component is designed to be copy-pasted directly into your codebase with minimal dependencies.",
  },
  {
    question: "Is it compatible with all React frameworks?",
    answer:
      "Yes, Chamaac UI is engineered for seamless compatibility across the entire React ecosystem. Whether you're building with Next.js, Remix, Vite, or a custom setup, our components integrate flawlessly with your existing styles and logic.",
  },
  {
    question: "Can I contribute?",
    answer:
      "We'd love to have you! Whether you want to suggest a new component, fix a bug, or improve documentation, your help is always welcome. Head over to our GitHub repository to check out our open issues and contribution guidelines.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <section className="w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col justify-center items-center gap-4 md:gap-12 text-center">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="description-primary text-sm md:text-lg max-w-[600px] text-center">
              Everything you need to know about Chamaac UI. Can&apos;t find the
              answer you&apos;re looking for? Reach out on GitHub.
            </p>
          </div>

          <div className="grid gap-3 md:gap-4 w-full max-w-[800px]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={cn(
                    "group border border-border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
                    isOpen ? "bg-secondary " : "hover:border-neutral-400/30"
                  )}
                >
                  <div className="w-full flex items-center justify-between p-5 text-left transition-colors">
                    <span className="text-base font-medium text-black dark:text-white uppercase">
                      {faq.question}
                    </span>
                    <IconChevronDown
                      className={cn(
                        "w-5 h-5 text-text-tertiary transition-transform duration-300",
                        isOpen ? "rotate-180 text-black dark:text-white" : ""
                      )}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 description-secondary text-left">
                          {faq.answer}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};
