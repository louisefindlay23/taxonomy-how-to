import { PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";
import styles from "./Navigation.module.css";

export default async function Navigation() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return (
    <nav className={styles.nav}>
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
  );
}
