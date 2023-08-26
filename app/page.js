import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { PrismicText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "./prismicio";
import { components } from "./slices";

/**
 * This component renders your homepage.
 *
 * Use Next's Head component to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */
export default async function Index() {
  const client = createClient();
  const page = await client.getByUID("page", "home");
  const tags = await client.getAllByType("tag");
  const specificTagPages = await client.getAllByType("post", {
    filters: [prismic.filter.at("my.post.category_group.category", tags[0].id)],
  });

  return (
    <main>
      <Head>
        <title>{page.data.meta_title}</title>
      </Head>

      <SliceZone slices={page.data.slices} components={components} />

      <ul>
        {tags.map((tag) => {
          return (
            <li key={tag.id}>
              <PrismicText field={tag.data.name} />
            </li>
          );
        })}
      </ul>

      <ul>
        {specificTagPages.map((pages) => {
          return <li key={pages.id}>{pages.data.meta_title}</li>;
        })}
      </ul>
    </main>
  );
}