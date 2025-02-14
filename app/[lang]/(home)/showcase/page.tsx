import { createMetadata } from '@/lib/metadata';
import NextNewsReader from '@/public/placeholder.png';
import Image, { type StaticImageData } from 'next/image';

export const metadata = createMetadata({
  title: 'Showcase',
  description: 'Some cool projects I developed',
  openGraph: {
    url: 'https://kaiyang.xyz/showcase',
  },
});

interface ShowcaseObject {
  image?: StaticImageData;
  name: string;
  url: string;
}

export default function Showcase(): React.ReactElement {
  const showcases: ShowcaseObject[] = [
    {
      image: NextNewsReader,
      name: 'NextNewsReader',
      url: 'https://news.kayang.xyz',
    },
  ];

  return (
    <main className="pb-16 z-[2]">
      <div className="container my-12 text-center">
        <h1 className="mb-4 text-3xl font-semibold leading-snug md:text-5xl md:leading-snug">
          Cool Projects
          <br />
          Made by Mizar
        </h1>
        <p className="text-fd-muted-foreground">
          Nice open-source projects powered by Next.js
        </p>
      </div>

      <div className="container mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase) => (
          <ShowcaseItem key={showcase.url} {...showcase} />
        ))}
      </div>
    </main>
  );
}

function ShowcaseItem({
  name,
  url,
  image,
}: ShowcaseObject): React.ReactElement {
  if (image) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="relative flex aspect-[1.91/1] flex-col overflow-hidden rounded-2xl border transition-all hover:border-fd-primary/30"
      >
        <Image
          alt="Preview"
          src={image}
          placeholder="blur"
          fill
          sizes="100vw, (min-width: 750px) 500px"
        />
        <p className="z-[2] mt-auto bg-black/50 p-4 text-sm font-medium text-white backdrop-blur-sm">
          {name}
        </p>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="flex aspect-[1.91/1] flex-col rounded-2xl border border-transparent p-8 text-center shadow-fd-primary/20 transition-all hover:shadow-fd-primary/30"
      style={{
        backgroundImage:
          'radial-gradient(closest-side at center, var(--color-fd-background) 89%, transparent 90%),' +
          'conic-gradient(from 0deg, var(--color-fd-background) 120deg, var(--color-fd-primary), var(--color-fd-background) 240deg),' +
          'linear-gradient(to right bottom, black, rgb(200,200,200), black)',
        backgroundOrigin: 'border-box',
        boxShadow: 'inset 0px 12px 28px 4px var(--tw-shadow-color)',
        backgroundClip: 'padding-box, padding-box, border-box',
      }}
    >
      <p className="mb-6 text-fd-muted-foreground">{new URL(url).hostname}</p>
      <p className="text-3xl font-semibold">{name}</p>
    </a>
  );
}
