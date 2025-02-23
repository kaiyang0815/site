import { BlogPosts } from '@/components/posts';
import Image from 'next/image';

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row space-y-4 items-center justify-between">
        <Image
          src={'/logo.png'}
          width={120}
          height={120}
          alt="A picture of me."
          style={{
            borderRadius: '50%',
          }}
          className="mr-12"
        />
        <p className="text-lg font-bold">
          Hi, I'm Mizar WANG, A Frontend developer, I use Next.js and Tailwind
          CSS
        </p>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
