import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { Post } from '@/types';
import { formatDate, getCategoryColor } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="card group">
        <Link href={`/post/${post.slug}`}>
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className={`category-badge ${getCategoryColor(post.category.slug)} mb-3`}>
                {post.category.name}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-200 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author.name}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="card group">
      <Link href={`/post/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Link href={`/category/${post.category.slug}`}>
            <span className={`category-badge ${getCategoryColor(post.category.slug)}`}>
              {post.category.name}
            </span>
          </Link>
          <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
        </div>
        <Link href={`/post/${post.slug}`}>
          <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>{post.author.name}</span>
          </div>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime} min
          </span>
        </div>
      </div>
    </article>
  );
}
