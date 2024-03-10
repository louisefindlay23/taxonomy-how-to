import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata({ params }) {
  const client = createClient();
  const post = await client.getByUID("page", params.uid);

  return {
    title: `${post.data.meta_title} - Taxonomy How-to`,
  };
}

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("page", params.uid);
  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page", {
    filters: [prismic.filter.not("my.page.uid", "home")],
  });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
