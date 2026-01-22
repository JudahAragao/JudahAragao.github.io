import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleHeaderBar } from "@/components/ArticleHeaderBar";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleContent } from "@/components/ArticleContent";
import { ArticleFooter } from "@/components/ArticleFooter";
import { api } from "@/lib/api";
import { CodeBlock } from "@/components/ui/code-block";
import { SafeHtml } from "@/components/ui/safe-html";

// Types for the API response
interface Category {
  title: string;
}

interface Post {
  id: number;
  title: string;
  category: Category;
  readTime?: string;
  publishedDate: string;
  author?: string; // API might not return this yet, optional
  content: any[]; // PayloadCMS blocks
}

// Simple serializer for Lexical nodes
const serializeLexical = (nodes: any[]): string => {
  return nodes.map((node) => {
    if (node.type === "text") {
      let text = node.text;
      if (node.format & 1) text = `<strong>${text}</strong>`;
      if (node.format & 2) text = `<em>${text}</em>`;
      if (node.format & 8) text = `<u>${text}</u>`;
      if (node.format & 16) text = `<code>${text}</code>`;
      return text;
    }

    if (!node) return "";

    const children = node.children ? serializeLexical(node.children) : "";

    switch (node.type) {
      case "heading":
        const headingSizes: Record<string, string> = {
          h1: "text-3xl",
          h2: "text-2xl",
          h3: "text-xl",
          h4: "text-lg",
          h5: "text-base",
          h6: "text-sm"
        };
        const sizeClass = headingSizes[node.tag] || "text-lg";
        return `<${node.tag} class="${sizeClass} font-serif text-heading mt-6 mb-3 font-semibold">${children}</${node.tag}>`;
      case "paragraph":
        return `<p class="text-body mb-4 leading-relaxed">${children}</p>`;
      case "list":
        const tag = node.tag === "ol" ? "ol" : "ul";
        const listClass = tag === "ol" ? "list-decimal" : "list-disc";
        return `<${tag} class="${listClass} list-inside text-body mb-4 space-y-2">${children}</${tag}>`;
      case "listitem":
        return `<li class="ml-4">${children}</li>`;
      case "quote":
        return `<blockquote class="border-l-2 border-warm pl-4 italic text-body my-4">${children}</blockquote>`;
      case "link":
        return `<a href="${node.fields?.url || "#"}" target="${node.fields?.newTab ? "_blank" : "_self"}" class="text-warm hover:underline">${children}</a>`;
      default:
        return children;
    }
  }).join("");
};

// Render blocks to React Nodes
const renderBlocks = (blocks: any[]) => {
  if (!blocks) return null;
  
  return blocks.map((block, index) => {
    // Handle Text Block (Lexical)
    if (block.text && block.text.root && block.text.root.children) {
      const html = serializeLexical(block.text.root.children);
      return (
        <SafeHtml 
          key={index} 
          html={html} 
          className="prose-lg prose-headings:font-serif prose-headings:text-heading prose-p:text-body prose-a:text-warm hover:prose-a:underline prose-blockquote:border-warm prose-blockquote:italic marker:text-foreground"
        />
      );
    }
    
    // Handle Code Block
    if (block.code) {
      return (
        <CodeBlock 
          key={index}
          code={block.code} 
          language={block.language} 
        />
      );
    }
    
    return null;
  });
};

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      
      setLoading(true);
      try {
        const response = await api.get<{ docs: Post[] }>(`posts?where[slug][equals]=${slug}`);
        if (response.docs && response.docs.length > 0) {
          setArticle(response.docs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background theme-transition flex items-center justify-center">
        <div className="text-center animate-pulse">
           <div className="h-8 w-64 bg-secondary rounded mb-4"></div>
           <p className="text-body">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background theme-transition flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-xl">Artigo não encontrado.</p>
          <a href="/blog" className="text-warm mt-4 inline-block hover:underline">Voltar ao Blog</a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const contentNodes = renderBlocks(article.content);

  return (
    <div className="min-h-screen bg-background theme-transition">
      <ArticleHeaderBar backTo="/blog" backText="Voltar ao Blog" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <article className="max-w-3xl mx-auto">
            <ArticleHeader 
              title={article.title}
              category={article.category?.title || "Geral"}
              readTime={article.readTime || "Leitura rápida"}
              author={article.author || "Judah de Aragão"}
              date={formattedDate}
            />
            
            <ArticleContent content={contentNodes} />
            
            <ArticleFooter />
          </article>
        </div>
      </main>
    </div>
  );
}