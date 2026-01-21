import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Technology {
  id: string;
  name: string;
}

interface TechnologyGroup {
  id: string;
  groupName: string;
  technologies: Technology[];
}

interface SkillsData {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  technologyGroups: TechnologyGroup[];
}

export function Skills() {
  const [data, setData] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await api.get<{ docs: SkillsData[] }>("skills");
        if (response.docs && response.docs.length > 0) {
          setData(response.docs[0]);
        }
      } catch (error) {
        console.error("Failed to fetch skills data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-background theme-transition">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="kindle-line mb-12" />
            <div className="h-10 w-48 bg-secondary rounded mb-4"></div>
            <div className="h-6 w-96 bg-secondary rounded mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 w-32 bg-secondary rounded"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="h-10 w-24 bg-secondary rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="kindle-line mt-12" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section id="skills" className="py-24 bg-background theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="kindle-line mb-12" />
          
          <h2 className="font-serif text-3xl md:text-4xl text-heading mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-body mb-12">
            {data.sectionDescription}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.technologyGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                <h3 className="font-serif text-xl text-heading border-b border-divider pb-2">
                  {group.groupName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-warm-light hover:text-heading transition-colors cursor-default"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="kindle-line mt-12" />
        </div>
      </div>
    </section>
  );
}