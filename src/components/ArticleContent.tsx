import { SafeHtml } from "@/components/ui/safe-html";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="max-w-none theme-transition">
      <div className="text-body leading-relaxed">
        <SafeHtml 
          html={content} 
          className="prose-lg prose-headings:font-serif prose-headings:text-heading prose-p:text-body prose-a:text-warm hover:prose-a:underline prose-blockquote:border-warm prose-blockquote:italic"
        />
      </div>
    </div>
  );
}