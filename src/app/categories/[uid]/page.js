import { PrismicNextLink } from "@prismicio/next";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

export async function generateMetadata({ params }) {
  const client = createClient();
  const category = await client.getByUID("category", params.uid);

  return {
    title: `${prismic.asText(category.data.name)} - Taxonomy How-to`,
  };
}

export default async function Category({ params }) {
  const client = createClient();

  // Query the specific category
  const category = await client.getByUID("category", params.uid);

  // Use the category ID to filter for posts with that category
  const pagesInCategory = await client.getAllByType("post", {
    filters: [prismic.filter.at("my.post.categories.category", category.id)],
  });

  return (
    <main>
      <ul>
        {pagesInCategory.map((page) => {
          return (
            <li key={page.id}>
              <PrismicNextLink document={page}>
                {page.data.meta_title}
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const categories = await client.getAllByType("category");

  return categories.map((category) => {
    return { uid: category.uid };
  });
}