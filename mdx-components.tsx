import { nodeTypes } from '@mdx-js/mdx';
import rehypeShiki from '@shikijs/rehype';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { JSX } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const components = {};

export function CustomMDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkToc],
          rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeStringify,
            [
              rehypeShiki,
              {
                themes: {
                  light: 'github-light',
                  dark: 'github-dark',
                },
                addLanguageClass: true,
              },
            ],
            [rehypeRaw, { passThrough: nodeTypes }],
          ],
        },
      }}
    />
  );
}
