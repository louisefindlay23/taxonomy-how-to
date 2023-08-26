import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "../prismicio";
import { components } from "../slices";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client.getByUID("page", params.uid);
  return (
    <main>
      <Head>
        <title>{page.data.meta_title}</title>
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}