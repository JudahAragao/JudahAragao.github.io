import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface ArticleHeaderBarProps {
  backTo: string;
  backText: string;
}

export function ArticleHeaderBar({ backTo, backText }: ArticleHeaderBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border theme-transition">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to={backTo} 
            className="flex items-center gap-2 text-body hover:text-heading transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{backText}</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}