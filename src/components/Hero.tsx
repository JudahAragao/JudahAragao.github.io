import { Download, ArrowDown } from "lucide-react";
import { useHero } from "@/hooks/queries";
import { SafeHtml } from "@/components/ui/safe-html";

export function Hero() {
  const { data, isLoading } = useHero();

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-hero-gradient theme-transition pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-secondary rounded mb-4"></div>
          <div className="h-16 w-64 md:w-96 bg-secondary rounded mb-6"></div>
          <div className="h-6 w-80 md:w-[30rem] bg-secondary rounded mb-10"></div>
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-secondary rounded"></div>
            <div className="h-12 w-36 bg-secondary rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  // Fix common CMS issue where className is returned instead of class in HTML strings
  const formattedName = data.name.replace(/className=/g, "class=");

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-hero-gradient theme-transition pt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-subtle text-sm tracking-widest uppercase mb-4 animate-fade-in">
            {data.greeting}
          </p>
          
          <SafeHtml 
            as="h1"
            className="font-serif text-5xl md:text-7xl font-semibold text-heading mb-6 animate-fade-in [&>span]:accent-warm" 
            style={{ animationDelay: "0.1s" }}
            html={formattedName}
          />
          
          <p className="text-body text-lg md:text-xl leading-relaxed mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {data.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href={data["link-curriculum"]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-secondary transition-colors text-body"
            >
              Conhecer mais
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
