import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import SEOHead from '@/components/SEO/SEOHead';
import PostCard from '@/components/Cards/PostCard';
import { authors, posts as mockPosts, authorMap } from '@/data/mockData';
import { getAllPosts } from '@/lib/mdxPosts';
import { Author, Post } from '@/types';

interface AuthorPageProps {
  author: Author;
  posts: Post[];
}

export default function AuthorPage({ author, posts }: AuthorPageProps) {
  // Get social links from either socials (new) or social (legacy) field
  const getSocialLink = (platform: string) => {
    return author.socials?.[platform] || author.social?.[platform as keyof typeof author.social];
  };

  const twitter = getSocialLink('twitter');
  const linkedin = getSocialLink('linkedin');
  const website = getSocialLink('website');

  return (
    <>
      <SEOHead
        title={`${author.name} - Author${author.role ? ` | ${author.role}` : ''}`}
        description={author.bio || `Author page for ${author.name}`}
      />

      <main className="py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Author Header */}
            <div className="mb-8 text-center">
              <Image
                src={author.avatar || '/images/authors/placeholder.png'}
                alt={author.name || 'Author'}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-3xl font-heading font-bold mb-2">{author.name}</h1>
              {author.role && <p className="text-sm font-semibold text-primary-600 mb-2">{author.role}</p>}
              {author.bio && <p className="text-gray-700 mb-6 max-w-2xl mx-auto">{author.bio}</p>}

              {/* Social Links */}
              <div className="flex items-center justify-center space-x-4">
                {twitter && (
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Twitter`}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s Website`}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Posts Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">
                {posts.length === 0
                  ? `No articles by ${author.name} yet`
                  : `${posts.length} Article${posts.length !== 1 ? 's' : ''} by ${author.name}`}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {posts.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    This author hasn't published any articles yet.
                  </p>
                )}
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/about" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                ← Back to all authors
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate static paths for all authors in the normalized authorMap
  const paths = authors.map((author) => ({
    params: { slug: author.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Look up author using the normalized authorMap (supports ID, slug, or name)
  const author = authorMap[slug];

  if (!author) {
    return { notFound: true };
  }

  // Combine MDX posts and mock data posts
  const mdxPosts = getAllPosts();
  const allPosts: Post[] = [...mdxPosts, ...mockPosts];

  // Filter posts by matching author ID (most efficient single-key comparison)
  const postsByAuthor = allPosts
    .filter((post) => post.author?.id === author.id)
    .sort((a, b) => {
      // For Quadri (founder), prioritize featured posts first while maintaining chronological order
      if (author.id === 'maruf-quadri') {
        // Featured posts come first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Within same featured status, sort by date (newer first)
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // For all other authors, use standard chronological sort (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return {
    props: {
      author,
      posts: postsByAuthor,
    },
    revalidate: 3600, // ISR: revalidate every hour
  };
};
