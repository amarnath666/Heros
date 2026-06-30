import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Carousels";
const description =
  "A collection of smooth, animated carousels for showcasing visual content.";
const pathname = "/components/carousels";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function CarouselsPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Carousels"
      pathname={pathname}
    />
  );
}
