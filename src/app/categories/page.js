import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export const metadata = {
  title: "Categories - Taxonomy How-to",
};

export default async function Categories() {
  const client = createClient();
  const categories = await client.getAllByType("category");

  return (
    <main>
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