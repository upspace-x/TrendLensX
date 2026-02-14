import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { Author } from '@/types/author';

interface AuthorCardProps {
  author: Author;
  showBio ? : boolean;
}

export default function AuthorCard({ author, showBio = true }: AuthorCardProps) {
  const SocialIcon = ({
    href,
    children,
    label
  }: { href: string;children: React.ReactNode;label: string }) => (
    <a
      href={href}
      className="relative text-gray-400 hover:text-primary-600 transition-colors group"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        {label}
      </span>
    </a>
  );
  
  const socialLinks = [
    author.twitter && { href: author.twitter, icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
    author.linkedin && { href: author.linkedin, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
    author.github && { href: author.github, icon: <Github className="w-5 h-5" />, label: 'GitHub' },
    author.website && { href: author.website, icon: <Globe className="w-5 h-5" />, label: 'Website' },
  ].filter(Boolean) as { href: string;icon: React.ReactNode;label: string } [];
  
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
      {showBio && <p className="text-gray-600 text-sm mt-2 mb-4">{author.bio}</p>}
      <div className="flex justify-center space-x-3">
        {socialLinks.map((s, i) => (
          <SocialIcon key={i} href={s.href} label={s.label}>{s.icon}</SocialIcon>
        ))}
      </div>
    </div>
  );
}