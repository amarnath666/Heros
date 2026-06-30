"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
