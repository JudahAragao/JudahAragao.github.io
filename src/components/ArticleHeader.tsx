import { Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";

interface ArticleHeaderProps {
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
}

export function ArticleHeader({ title, category, readTime, author, date }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 text-sm bg-warm-light accent-warm rounded-full">
          {category}
        </span>
        <span className="text-subtle text-sm flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {readTime}
        </span>
      </div>
      
      <h1 className="font-serif text-3xl md:text-4xl text-heading mb-6">
        {title}
      </h1>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-warm-light rounded-full flex items-center justify-center">
            <User className="w-5 h-5 accent-warm" />
          </div>
          <div>
            <p className="text-heading font-medium">{author}</p>
            <p className="text-subtle text-sm">{date}</p>
          </div>
        </div>
      </div>
    </header>
  );
}