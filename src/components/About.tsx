import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { SafeHtml } from "@/components/ui/safe-html";

interface AboutData {
  id: number;
  title: string;
  content: string;
  quote: string;
  quoteAuthor: string;
  hobbies: string;
}

export function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const response = await api.get<{ docs: AboutData[] }>("about");
        if (response.docs && response.docs.length > 0) {
          setData(response.docs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 bg-background theme-transition">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="kindle-line mb-12" />
            <div className="h-10 w-48 bg-secondary rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-secondary rounded"></div>
              <div className="h-4 w-full bg-secondary rounded"></div>
              <div className="h-4 w-3/4 bg-secondary rounded"></div>
            </div>
            <div className="kindle-line mt-12" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  // Process content: replace className with class and wrap paragraphs
  const formattedContent = data.content
    .replace(/className=/g, "class=")
    .split("\n\n")
    .map(p => `<p class="mb-6 last:mb-0">${p}</p>`)
    .join("");

  return (
    <section id="about" className="py-24 bg-background theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="kindle-line mb-12" />
          
          <h2 className="font-serif text-3xl md:text-4xl text-heading mb-8">
            {data.title}
          </h2>
          
          <div className="text-body leading-relaxed">
            <SafeHtml html={formattedContent} className="prose-none" />
            
            <blockquote className="border-l-2 border-warm pl-6 my-8 italic text-heading font-serif text-xl">
              "{data.quote}"
              <footer className="text-subtle text-sm mt-2 not-italic font-sans">{data.quoteAuthor}</footer>
            </blockquote>
            
            <SafeHtml html={data.hobbies} as="p" />
          </div>
          
          <div className="kindle-line mt-12" />
        </div>
      </div>
    </section>
  );
}
