import { PrismicNextLink } from "@prismicio/next";
import { SliceZone, PrismicText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export const metadata = {
  title: "Categories - Taxonomy How-to",
};

export default async function Categories() {
  const client = createClient();
  const page = await client.getByUID("page", "categories");
  const categories = await client.getAllByType("category");

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <PrismicNextLink document={category}>
                <PrismicText field={category.data.name} />
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
