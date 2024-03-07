import { PrismicRichText } from "@prismicio/react";

/**
 * @type {import("@prismicio/react").JSXMapSerializer}
 */
const components = {
  label: ({ node, children }) => {},
};

/**
 * @typedef {import("@prismicio/client").Content.RichTextSlice} RichTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RichTextSlice>} RichTextProps
 * @param { RichTextProps }
 */
export default function RichText({ slice }) {
  return (
    <PrismicRichText field={slice.primary.content} components={components} />
  );
}
