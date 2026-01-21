import { SafeHtml } from "@/components/ui/safe-html";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none theme-transition">
      <div className="text-body leading-relaxed">
        <SafeHtml html={content} />
      </div>
    </div>
  );
}