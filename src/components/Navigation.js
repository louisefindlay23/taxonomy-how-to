import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

export default async function Navigation() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return (
    <nav>
      <ul>
        {pages.map((page) => {
          return (
            <li key={page.id}>
              <PrismicNextLink document={page}>
                {page.data.meta_title}
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}