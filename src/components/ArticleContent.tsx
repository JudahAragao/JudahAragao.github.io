interface ArticleContentProps {
  content: React.ReactNode;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="max-w-none theme-transition">
      <div className="text-body leading-relaxed">
        {content}
      </div>
    </div>
  );
}