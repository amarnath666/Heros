import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Sections";
const description =
  "A collection of ready-to-use, animated sections for modern landing pages.";
const pathname = "/components/sections";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function SectionsPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Sections"
      pathname={pathname}
    />
  );
}
