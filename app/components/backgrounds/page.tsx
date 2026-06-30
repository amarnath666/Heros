import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Backgrounds";
const description =
  "A collection of immersive, animated backgrounds for modern interfaces.";
const pathname = "/components/backgrounds";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function BackgroundsPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Backgrounds"
      pathname={pathname}
    />
  );
}
