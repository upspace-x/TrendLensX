import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  showBio?: boolean;
}

export default function AuthorCard({ author, showBio = true }: AuthorCardProps) {
  return (
    <div className="card p-6 text-center">
      <Image
        src={author.avatar || '/images/authors/maruf-quadri.png'}
        alt={author.name}
        width={80}
        height={80}
        className="rounded-full mx-auto mb-4"
      />
      <Link href={`/author/${author.slug}`}>
        <h3 className="font-heading font-semibold text-lg hover:text-primary-600 transition-colors">
          {author.name}
        </h3>
      </Link>
      {showBio && (
        <p className="text-gray-600 text-sm mt-2 mb-4">{author.bio}</p>
      )}
      <div className="flex justify-center space-x-3">
        {author.social?.twitter && (
          <a href={author.social.twitter} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {author.social?.linkedin && (
          <a href={author.social.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {author.social?.github && (
          <a href={author.social.github} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Github className="w-5 h-5" />
          </a>
        )}
        {author.social?.website && (
          <a href={author.social.website} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
