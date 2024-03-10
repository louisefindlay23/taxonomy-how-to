import { SliceZone, PrismicText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata({ params }) {
  const client = createClient();
  const post = await client.getByUID("post", params.uid);

  return {
    title: `${post.data.meta_title} Post - Taxonomy How-to`,
  };
}

export default async function Post({ params }) {
  const client = createClient();
  const post = await client.getByUID("post", params.uid, {
    fetchLinks: ["category.name"],
  });

  return (
    <main>
      <h2>{post.data.meta_title} Post</h2>
      <h3>Categories</h3>
      <ul>
        {post.data.categories.map((category) => {
          return (
            <li key={JSON.stringify(category.category)}>
              <PrismicText field={category.category.data.name} />
            </li>
          );
        })}
      </ul>
      <SliceZone slices={post.data.slices} components={components} />
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("post");

  return posts.map((post) => {
    return { uid: post.uid };
  });
}
