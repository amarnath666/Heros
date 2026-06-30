import type { Metadata } from "next";

export const SITE_NAME = "Chamaac UI";
export const SITE_URL = "https://chamaac.com";
export const DEFAULT_OG_IMAGE = "/images/og-image.png";
export const DEFAULT_DESCRIPTION =
  "Explore a premium collection of high-performance shader components, interactive backgrounds, and modern UI elements crafted with React and GLSL.";

const DEFAULT_KEYWORDS = [
  "Chamaac UI",
  "Shaders",
  "GLSL Shaders",
  "Animated Backgrounds",
  "Shaders & UI Components",
  "React Shader Components",
  "GLSL Components",
  "WebGL UI",
  "High-performance shaders",
  "React Three Fiber backgrounds",
  "Interactive UI components",
  "Modern web design",
  "Framer Motion components",
  "Next.js components",
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  icons = "/favicon.png",
  noIndex = false,
  keywords = [],
  pathname,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  pathname?: string;
  type?: "website" | "article";
} = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | High-Performance Shaders & UI Components`;
  const resolvedPath = pathname
    ? pathname.startsWith("/")
      ? pathname
      : `/${pathname}`
    : undefined;
  const resolvedUrl = resolvedPath ? absoluteUrl(resolvedPath) : SITE_URL;

  return {
    title: resolvedTitle,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: resolvedTitle,
      description,
      url: resolvedUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [image],
      creator: "@amarnath",
    },
    icons,
    alternates: resolvedPath
      ? {
          canonical: resolvedPath,
        }
      : undefined,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function buildComponentMetadata({
  title,
  description,
  image,
  pathname,
  keywords = [],
  category,
}: {
  title: string;
  description: string;
  image: string;
  pathname: string;
  keywords?: string[];
  category?: string;
}) {
  const componentKeywords = [
    `${title} component`,
    `${title} React component`,
    `${title} Next.js component`,
    `${title} Tailwind CSS`,
    `Chamaac UI ${title}`,
    ...(category ? [`${category} components`, `${category} React UI`] : []),
  ];

  return buildPageMetadata({
    title,
    description,
    image,
    pathname,
    keywords: [...componentKeywords, ...keywords],
  });
}

export function buildAnimatedIconMetadata(title: string, pathname: string) {
  return buildComponentMetadata({
    title,
    description:
      "A polished animated icon component for React and Next.js with smooth motion and production-ready usage patterns.",
    image: "/components/animated-icons.png",
    pathname,
    category: "Animated Icons",
    keywords: [
      "animated icons",
      "react animated icons",
      "next.js animated icons",
      "icon micro interactions",
      "motion icon component",
    ],
  });
}

export function createCollectionPageJsonLd({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(pathname),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createComponentJsonLd({
  name,
  description,
  pathname,
  image,
  category,
}: {
  name: string;
  description: string;
  pathname: string;
  image: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: category ?? "WebComponent",
    operatingSystem: "Web",
    description,
    url: absoluteUrl(pathname),
    image: absoluteUrl(image),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
