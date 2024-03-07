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

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
