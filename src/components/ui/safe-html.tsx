import DOMPurify from 'dompurify';
import { cn } from "@/lib/utils";
import React from 'react';

interface SafeHtmlProps extends React.HTMLAttributes<HTMLDivElement> {
  html: string;
  as?: 'div' | 'span' | 'p' | 'article' | 'section' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * A component to safely render HTML content sanitized by DOMPurify.
 * Useful for rendering content from CMSs like PayloadCMS.
 */
export function SafeHtml({ html, className, as: Component = 'div', ...props }: SafeHtmlProps) {
  const sanitizedHtml = React.useMemo(() => ({
    __html: DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'rel', 'class'], // Allow target="_blank", rel="noopener noreferrer", and class for styling
    })
  }), [html]);

  return (
    <Component
      className={cn("prose dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={sanitizedHtml}
      {...props}
    />
  );
}

/**
 * Utility function to sanitize HTML string.
 * Use this if you need the sanitized string directly, but prefer using the <SafeHtml /> component.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
