import { PrismicNextLink } from "@prismicio/next";

import { createClient } from "@/prismicio";

export const metadata = {
  title: "Posts - Taxonomy How-to",
};

export default async function PostPage() {
  const client = createClient();
  const posts = await client.getAllByType("post");

  return (
    <main>
      <h2>Posts</h2>
      <p>
        To create a list of every post, query by the post custom type:
        client.getbyUID("post");
      </p>
      <p>See the posts below.</p>
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
