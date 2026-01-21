import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleHeaderBar } from "@/components/ArticleHeaderBar";
import { Footer } from "@/components/Footer";
import { api } from "@/lib/api";

interface Category {
  id: number | string;
  title: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: Category;
  readTime?: string;
  publishedDate: string;
  featured?: boolean;
}

interface PaginatedResponse<T> {
  docs: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", title: "Todos", slug: "todos" }
  ]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Fetch Categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get<{ docs: Category[] }>("categories");
        if (response.docs) {
          setCategories([
            { id: "all", title: "Todos", slug: "todos" },
            ...response.docs
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch Posts
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let endpoint = `posts?page=${page}`;
        if (selectedCategory !== "todos") {
          endpoint = `posts?where[category.slug][equals]=${selectedCategory}&page=${page}`;
        }

        const response = await api.get<PaginatedResponse<Post>>(endpoint);
        if (response.docs) {
          setPosts(response.docs);
          setTotalPages(response.totalPages);
          setHasNextPage(response.hasNextPage);
          setHasPrevPage(response.hasPrevPage);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [selectedCategory, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  // Client-side search filtering (Note: Ideally search should be server-side too for proper pagination)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background theme-transition">
      <ArticleHeaderBar backTo="/" backText="Voltar" />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-heading mb-4">
                Blog
              </h1>
              <p className="text-body text-lg">
                Artigos sobre desenvolvimento, arquitetura de software e estudos de caso.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-12 space-y-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-subtle" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-secondary/50 border border-border rounded-lg text-heading placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all theme-transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle hover:text-heading transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      selectedCategory === category.slug
                        ? "bg-heading text-background"
                        : "bg-secondary/50 text-body hover:bg-secondary hover:text-heading"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="h-40 w-full bg-secondary/50 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <>
                {/* Results Count */}
                <p className="text-subtle text-sm mb-8">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
                </p>

                {/* Featured Posts (if any) */}
                {featuredPosts.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-subtle text-xs tracking-widest uppercase mb-6">
                      Destaques
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {featuredPosts.map((post) => (
                        <article
                          key={post.id}
                          className="group cursor-pointer p-6 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border"
                        >
                          <Link to={`/blog/${post.slug}`} className="block">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-2 py-1 text-xs bg-warm-light accent-warm rounded">
                                {post.category.title}
                              </span>
                              {post.readTime && (
                                <span className="text-subtle text-xs flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.readTime}
                                </span>
                              )}
                            </div>
                            <h3 className="font-serif text-xl text-heading mb-3 group-hover:accent-warm transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-body text-sm leading-relaxed mb-4">
                              {post.description}
                            </p>
                            <span className="text-subtle text-xs">{formatDate(post.publishedDate)}</span>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Posts (or all if no featured logic) */}
                {(regularPosts.length > 0 || (featuredPosts.length === 0 && filteredPosts.length > 0)) && (
                  <div className="space-y-1">
                    {featuredPosts.length > 0 && (
                      <h2 className="text-subtle text-xs tracking-widest uppercase mb-6">
                        Todos os Artigos
                      </h2>
                    )}
                    
                    {(featuredPosts.length === 0 ? filteredPosts : regularPosts).map((post) => (
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
                          <p className="text-body leading-relaxed">{post.description}</p>
                        </Link>
                        <div className="kindle-line mt-1" />
                      </article>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-body mb-2">Nenhum artigo encontrado.</p>
                    <p className="text-subtle text-sm">
                      Tente ajustar sua pesquisa ou filtros.
                    </p>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={!hasPrevPage}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        !hasPrevPage
                          ? "text-subtle cursor-not-allowed opacity-50"
                          : "text-body hover:text-heading hover:bg-secondary/50"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </button>
                    
                    <span className="text-sm text-subtle font-medium">
                      Página {page} de {totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={!hasNextPage}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        !hasNextPage
                          ? "text-subtle cursor-not-allowed opacity-50"
                          : "text-body hover:text-heading hover:bg-secondary/50"
                      }`}
                    >
                      Próxima
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
