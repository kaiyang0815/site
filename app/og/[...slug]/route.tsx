import { metadataImage } from '@/lib/metadata-image';
import { generateOGImage } from 'fumadocs-ui/og';
import { readFileSync } from 'node:fs';

const font = readFileSync('./app/og/[...slug]/Inter-Regular.woff2');
const fontBold = readFileSync('./app/og/[...slug]/Inter-Bold.woff2');

export const GET = metadataImage.createAPI((page) => {
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
        weight: 700,
      },
    ],
  });
});

export function generateStaticParams(): {
  slug: string[];
}[] {
  return metadataImage.generateParams();
}
