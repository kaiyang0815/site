import { formatDate, getBlogPosts } from '@/lib/utils';
import { CustomMDX } from '@/mdx-components';
import { baseUrl } from 'app/sitemap';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="prose dark:prose-invert">
      <h1>{post.metadata.title}</h1>
      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-300 dark:text-zinc-500">
          {formatDate(post.metadata.publishedAt, true)}
        </p>
      </div>
      <article>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
