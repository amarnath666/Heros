"use client";

import posthog from "posthog-js";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export type CopyEventName =
  | "component_code_copied"
  | "cli_command_copied"
  | "dependency_command_copied"
  | "code_snippet_copied"
  | "configuration_copied";

export interface CopyAnalytics extends AnalyticsProperties {
  event: CopyEventName;
  surface: string;
  component_name?: string;
  package_manager?: string;
  command_purpose?: string;
  filename?: string;
}

/**
 * Keep product analytics calls consistent and easy to disable when PostHog is
 * not configured. Never pass source code, commands, or other clipboard content.
 */
export function captureEvent(
  event: string,
  properties: AnalyticsProperties = {}
) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.capture(event, properties);
}

export function captureCopyFailure(
  targetEvent: CopyEventName,
  properties: Omit<CopyAnalytics, "event">
) {
  captureEvent("copy_failed", {
    ...properties,
    target_event: targetEvent,
  });
}
