import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useFooter } from "@/hooks/queries";

export function Footer() {
  const { data, isLoading } = useFooter();

  if (isLoading) {
    return (
      <footer id="contact" className="py-16 bg-secondary/50 theme-transition">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="kindle-line mb-12" />
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="h-10 w-64 bg-secondary rounded mb-4"></div>
                <div className="h-20 w-full bg-secondary rounded mb-6"></div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-11 w-11 bg-secondary rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="h-64 bg-secondary rounded-lg"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!data) return null;

  const socialLinks = [
    { icon: Github, href: data["link-github"], label: "GitHub" },
    { icon: Linkedin, href: data["link-linkedin"], label: "LinkedIn" },
    { icon: Twitter, href: data["link-x"], label: "X (Twitter)" },
    { icon: Mail, href: data["link-email"], label: "Email" },
  ].filter(link => link.href);

  return (
    <footer id="contact" className="py-16 bg-secondary/50 theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Contact Section */}
          <div className="kindle-line mb-12" />
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-heading mb-4">
                {data.sectionTitle.replace("?", "")}<span className="accent-warm">?</span>
              </h2>
              <p className="text-body leading-relaxed mb-6">
                {data.sectionDescription}
              </p>
              
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href!}
                    target={label === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 bg-background hover:bg-secondary rounded-lg transition-colors border border-border"
                  >
                    <Icon className="w-5 h-5 text-body hover:text-heading transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="kindle-line mb-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-serif text-lg text-heading mb-1">
                judah<span className="accent-warm">.</span>aragao
              </p>
              <p className="text-subtle text-sm">
                © {new Date().getFullYear()} Todos os direitos reservados.
              </p>
            </div>
            
            <nav className="flex items-center gap-6 text-sm text-body">
              <a 
                href="/#about" 
                className="hover:text-heading transition-colors"
              >
                Sobre
              </a>
              <a 
                href="/#projects" 
                className="hover:text-heading transition-colors"
              >
                Projetos
              </a>
              <a 
                href="/#blog" 
                className="hover:text-heading transition-colors"
              >
                Blog
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}