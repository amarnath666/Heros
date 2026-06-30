import { buildPageMetadata } from "@/lib/seo";
import CategoryPage from "../category-page";

export const metadata = buildPageMetadata({
  title: "Buttons",
  description:
    "A collection of interactive and animated buttons for your applications.",
  image: "/components/buttons/buttons.png",
  pathname: "/components/buttons",
});

export default function ButtonsPage() {
  return (
    <CategoryPage
      title="Buttons"
      description="A collection of interactive and animated buttons for your applications."
      category="Buttons"
      pathname="/components/buttons"
    />
  );
}
