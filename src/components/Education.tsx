import { GraduationCap, Award } from "lucide-react";
import { useEducation } from "@/hooks/queries";

export function Education() {
  const { data, isLoading } = useEducation();

  if (isLoading) {
    return (
      <section id="education" className="py-24 bg-secondary/30 theme-transition">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-10 w-48 bg-secondary rounded mb-4"></div>
            <div className="h-6 w-96 bg-secondary rounded mb-12"></div>
            <div className="space-y-8 mb-16">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 w-full bg-secondary/50 rounded-lg"></div>
              ))}
            </div>
            <div className="h-8 w-48 bg-secondary rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-full bg-secondary/50 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section id="education" className="py-24 bg-secondary/30 theme-transition">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-heading mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-body mb-12">
            {data.sectionDescription}
          </p>
          
          <div className="space-y-8 mb-16">
            {data.education.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-6 bg-card rounded-lg border border-border"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-warm-light rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 accent-warm" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-heading mb-1">
                    {item.title}
                  </h3>
                  <p className="text-subtle text-sm mb-2">
                    {item.institution} • {item.period}
                  </p>
                  <p className="text-body">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {
            data.certifications && data.certifications.length > 0 && (
              <h3 className="font-serif text-2xl text-heading mb-6">
                Certificações
              </h3>
            )
          }
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
              >
                <Award className="w-5 h-5 accent-warm flex-shrink-0" />
                <div>
                  <p className="text-heading text-sm font-medium">{cert.title}</p>
                  <p className="text-subtle text-xs">
                    {cert.issuer ? `${cert.issuer} • ` : ""}{cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}