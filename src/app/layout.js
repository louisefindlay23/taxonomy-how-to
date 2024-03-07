import "/public/main.css";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import Header from "@/components/Header";

export const metadata = {
  title: "Taxonomy How-to",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
