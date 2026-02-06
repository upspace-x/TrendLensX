export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  email?: string;
  // keep the existing `social` shape for backwards compatibility
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  // new optional fields for richer author profiles
  role?: string;
  socials?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
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
  author: Author;
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
