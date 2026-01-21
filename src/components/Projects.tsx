import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Technology {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string | null;
  projectUrl: string | null;
  technologies: Technology[];
}

interface ProjectsSection {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  projects: Project[];
}

export function Projects() {
  const [data, setData] = useState<ProjectsSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get<{ docs: ProjectsSection[] }>("projects");
        if (response.docs && response.docs.length > 0) {
          setData(response.docs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch projects data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-secondary/30 theme-transition">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-10 w-48 bg-secondary rounded mb-4"></div>
            <div className="h-6 w-96 bg-secondary rounded mb-12"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 w-full bg-secondary/50 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section id="projects" className="py-24 bg-secondary/30 theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-heading mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-body mb-12">
            {data.sectionDescription}
          </p>
          
          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <article
                key={project.id}
                className="group p-6 md:p-8 bg-card rounded-lg border border-border hover:border-warm/30 transition-all duration-300 theme-transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl md:text-2xl text-heading mb-3 group-hover:accent-warm transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:ml-6">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-secondary rounded-md transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5 text-body" />
                      </a>
                    )}
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-secondary rounded-md transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5 text-body" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
