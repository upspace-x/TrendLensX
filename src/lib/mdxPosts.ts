import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, Author, Category } from '@/types';
import { authors, categories } from '@/data/mockData';
import { calculateReadTime } from './utils';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

interface PostFrontMatter {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  featuredImage?: string;
}

function getAuthorByName(authorName: string): Author {
  const author = authors.find(
    (a) => a.name.toLowerCase() === authorName.toLowerCase()
  );
  if (!author) {
    throw new Error(`Author not found: ${authorName}`);
  }
  return author;
}

function getCategoryBySlug(slug: string): Category {
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    throw new Error(`Category not found: ${slug}`);
  }
  return category;
}

function getMDXFiles(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

function parseMDXFile(filename: string): { data: PostFrontMatter; content: string } {
  const filepath = path.join(postsDirectory, filename);
  const source = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(source);
  return { data: data as PostFrontMatter, content };
}

export function getAllPosts(): Post[] {
  const mdxFiles = getMDXFiles();
  const posts = mdxFiles
    .map((file) => {
      const { data, content } = parseMDXFile(file);
      const author = getAuthorByName(data.author);
      const category = getCategoryBySlug(data.category);
      const readTime = calculateReadTime(content);
      
      return {
        id: data.slug,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: content,
        coverImage: data.featuredImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
        publishedAt: new Date(data.date).toISOString(),
        author,
        category,
        tags: [],
        readTime,
        featured: false,
      } as Post;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const mdxFiles = getMDXFiles();
  const filename = mdxFiles.find((f) => f.includes(slug));

  if (!filename) {
    return null;
  }

  const { data, content } = parseMDXFile(filename);
  const author = getAuthorByName(data.author);
  const category = getCategoryBySlug(data.category);
  const readTime = calculateReadTime(content);

  return {
    id: data.slug,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: content,
    coverImage: data.featuredImage || 'https://images.unsplash.com/photo-1461896834934-ffe607ba8211?w=800&h=400&fit=crop',
    publishedAt: new Date(data.date).toISOString(),
    author,
    category,
    tags: [],
    readTime,
    featured: false,
  } as Post;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((post) => post.category.slug === categorySlug);
}
