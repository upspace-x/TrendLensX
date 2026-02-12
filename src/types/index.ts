export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role?: string;
  bio: string;
  avatar: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  isPrimary?: boolean;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  authorId: string;
  category: Category;
  tags: string[];
  readTime: number;
  readingTime?: string;
  wordCount?: number;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
    type?: string;
  };
}
