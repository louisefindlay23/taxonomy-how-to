import Head from "next/head";
import { SliceZone, PrismicText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */
export default function Post({ post }) {
  return (
    <main>
      <Head>
        <title>{post.data.meta_title}</title>
      </Head>
      <ul>
        {post.data.category_group.map((category) => {
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

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const post = await client.getByUID("post", params.uid, {
    fetchLinks: ["tag.name"],
  });

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const posts = await client.getAllByType("post", {});

  /**
   * Define a path for every Document.
   */
  return {
    paths: posts.map((post) => {
      return prismic.asLink(post);
    }),
    fallback: false,
  };
}