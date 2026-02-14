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
        src={author.image}
        alt={author.name}
        width={400}
        height={400}
        className="rounded-full object-cover mx-auto mb-4"
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
        {author.twitter && (
          <a href={author.twitter} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {author.linkedin && (
          <a href={author.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
