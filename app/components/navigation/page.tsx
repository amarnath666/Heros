import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Navigation";
const description =
  "A collection of animated navigation components for intuitive interfaces.";
const pathname = "/components/navigation";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function NavigationPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Navigation"
      pathname={pathname}
    />
  );
}
