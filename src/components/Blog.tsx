import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { usePosts } from "@/hooks/queries";

export function Blog() {
  const { data: postsData, isLoading } = usePosts({ limit: 4 });
  const posts = postsData?.docs || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <section id="blog" className="py-24 bg-background theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="kindle-line mb-12" />
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-heading mb-4">
                Blog
              </h2>
              <p className="text-body">
                Artigos sobre desenvolvimento, arquitetura e estudos de caso.
              </p>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm text-body hover:text-heading transition-colors"
            >
              Ver todos os artigos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full bg-secondary/50 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block p-6 -mx-6 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 text-xs bg-warm-light accent-warm rounded">
                        {post.category.title}
                      </span>
                      {post.readTime && (
                        <span className="text-subtle text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      )}
                      <span className="text-subtle text-xs">{formatDate(post.publishedDate)}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-heading mb-2 group-hover:accent-warm transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-body leading-relaxed line-clamp-2">{post.description}</p>
                  </Link>
                  <div className="kindle-line mt-6" />
                </article>
              ))}
            </div>
          )}

          <Link
            to="/blog"
            className="md:hidden inline-flex items-center gap-2 text-sm text-body hover:text-heading transition-colors mt-8"
          >
            Ver todos os artigos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
