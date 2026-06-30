import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Text Animations";
const description =
  "A collection of expressive text animations that bring words to life.";
const pathname = "/components/text-animations";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function TextAnimationsPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Text Animations"
      pathname={pathname}
    />
  );
}
