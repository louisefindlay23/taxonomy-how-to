import { PrismicNextLink } from "@prismicio/next";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

export async function generateMetadata({ params }) {
  const client = createClient();
  const category = await client.getByUID("category", params.uid);

  return {
    title: `${prismic.asText(category.data.name)} Category - Taxonomy How-to`,
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
      <h2>{params.uid} Category</h2>
      <p>
        To create a page for each category, in the app directory, create a file
        at app/category/[uid]/page.js.
      </p>
      <p>
        To create a list of pages in a category, in page.js, retrieve the
        category ID for the category you wish to filter for by using
        client.getByUID().
      </p>
      <p>
        Then query all documents with the page type you wish to display and use
        the at() filter with the IDs of the page type, group field, content
        relationship, and category, like this:
      </p>
      <p>Visit the Display a page's categories section for more details.</p>

      <a
        href="https://prismic.io/docs/taxonomies-nextjs#display-a-pages-categories"
        target="_blank"
      >
        Display a page's categories
      </a>
      <p>See the categories below.</p>
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
