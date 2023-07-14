import Head from "next/head";
import { SliceZone, PrismicText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "../../prismicio";
import { components } from "../../slices";

export default async function Post({ params }) {
  const client = createClient();
  const post = await client.getByUID("post", params.uid, {
    fetchLinks: ["tag.name"],
  });
  return (
    <main>
      <Head>
        <title>{post.data.meta_title}</title>
      </Head>
      <ul>
        {post.data.category_group.map((category) => {
            console.info(category);
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
  const posts = await client.getAllByType("post", {});

  return posts.map((post) => {
    return { uid: post.uid };
  });
}