import { PrismicNextLink } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getByUID("page", "home");

  return {
    title: `${page.data.meta_title} - Taxonomy How-to`,
  };
}

export default async function Index() {
  const client = createClient();
  const page = await client.getByUID("page", "home");
  const posts = await client.getAllByType("post");

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <PrismicNextLink document={post}>
                {post.data.meta_title}
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
}