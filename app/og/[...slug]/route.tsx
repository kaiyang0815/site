import { metadataImage } from '@/lib/metadata-image';
import { generateOGImage } from 'fumadocs-ui/og';
import { type ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';

const font = readFileSync('./app/og/[...slug]/Inter-Bold.ttf');
const fontBold = readFileSync('./app/og/[...slug]/Inter-Regular.ttf');

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    primaryTextColor: 'rgb(240,240,240)',
    title: page.data.title,
    description: page.data.description,
    fonts: [
      {
        name: 'Inter',
        data: font,
        weight: 400,
      },
      {
        name: 'Inter',
        data: fontBold,
        weight: 600,
      },
    ],
  });
});

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
