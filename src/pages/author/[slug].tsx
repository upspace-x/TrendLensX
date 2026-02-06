import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import PostCard from '@/components/Cards/PostCard';
import AuthorCard from '@/components/Cards/AuthorCard';
import { authors as mockAuthors, posts as mockPosts, authorMap } from '@/data/mockData';
import { getAllPosts } from '@/lib/mdxPosts';
import { Author, Post } from '@/types';

interface AuthorPageProps {
  author: Author;
  posts: Post[];
}

export default function AuthorPage({ author, posts }: AuthorPageProps) {
  return (
    <>
      <SEOHead title={`${author.name} - Author`} description={author.bio || ''} />

      <main className="py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <Image
                src={author.avatar || '/images/authors/placeholder.png'}
                alt={author.name || 'Author'}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-heading font-semibold">{author.name}</h1>
              {author.role && <p className="text-sm text-gray-600 mb-2">{author.role}</p>}
              {author.bio && <p className="text-gray-700 mb-4">{author.bio}</p>}

              <div className="flex items-center justify-center space-x-4">
                {author.social?.twitter && (
                  <a href={author.social.twitter} className="text-gray-500 hover:text-primary-600">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {author.social?.linkedin && (
                  <a href={author.social.linkedin} className="text-gray-500 hover:text-primary-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {author.social?.website && (
                  <a href={author.social.website} className="text-gray-500 hover:text-primary-600">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Articles by {author.name}</h2>
              <div className="grid grid-cols-1 gap-6">
                {posts.length === 0 && (
                  <p className="text-gray-600">No posts by this author yet.</p>
                )}
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link href="/about" className="text-primary-600 hover:underline">Back to authors</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockAuthors.map((a) => ({ params: { slug: a.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const author = authorMap[slug] || mockAuthors.find((a) => a.slug === slug) || null;

  if (!author) {
    return { notFound: true };
  }

  const mdxPosts = getAllPosts();
  const allPosts: Post[] = [...mdxPosts, ...mockPosts];

  const postsByAuthor = allPosts.filter((p) => {
    if (!p.author) return false;
    const a = p.author as Author;
    return (
      a.slug === author.slug ||
      a.id === author.id ||
      a.name?.toLowerCase() === author.name?.toLowerCase()
    );
  })
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {
    props: {
      author,
      posts: postsByAuthor,
    },
  };
};
