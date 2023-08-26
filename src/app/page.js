import { PrismicNextLink } from "@prismicio/next";
// TODO: Move to Next Metadata
import Head from "next/head";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

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
  const pages = await client.getAllByType("page");
  const posts = await client.getAllByType("post");

  return (
    <main>
      <Head>
        <title>{page.data.meta_title}</title>
      </Head>
      {/* TODO: Move to layout and components */}
      <header>
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
      </header>

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