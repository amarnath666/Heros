import { createCollectionPageJsonLd } from "@/lib/seo";
import ComponentsGrid from "./components-grid";

interface CategoryPageProps {
  title: string;
  description: string;
  category: string;
  pathname: string;
}

export default function CategoryPage({
  title,
  description,
  category,
  pathname,
}: CategoryPageProps) {
  const jsonLd = createCollectionPageJsonLd({
    title: `Chamaac UI ${title}`,
    description,
    pathname,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComponentsGrid
        title={title}
        description={description}
        category={category}
      />
    </>
  );
}
