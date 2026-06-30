import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: "https://us.i.posthog.com",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_pageview: false, // Captured with pathname/search params by PostHogPageView.
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
