import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function ArticleFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-divider">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-subtle">Compartilhar:</span>
          <div className="flex gap-2">
            <a 
              href="#" 
              className="px-3 py-1 text-sm bg-secondary text-body rounded hover:bg-warm-light hover:text-heading transition-colors"
            >
              Twitter
            </a>
            <a 
              href="#" 
              className="px-3 py-1 text-sm bg-secondary text-body rounded hover:bg-warm-light hover:text-heading transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-secondary text-body rounded hover:bg-warm-light hover:text-heading transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ver todos os artigos
        </Link>
      </div>
    </footer>
  );
}