import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

const title = "Inputs";
const description =
  "A collection of polished, interactive input components for your applications.";
const pathname = "/components/inputs";

export const metadata = buildPageMetadata({ title, description, pathname });

export default function InputsPage() {
  return (
    <CategoryPage
      title={title}
      description={description}
      category="Inputs"
      pathname={pathname}
    />
  );
}
