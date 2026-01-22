import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

// --- Types ---
export interface Category {
  id: number | string;
  title: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: Category;
  readTime?: string;
  publishedDate: string;
  featured?: boolean;
  author?: string;
  content?: any[]; // PayloadCMS blocks
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

export interface Technology {
  id: string;
  name: string;
}

export interface TechnologyGroup {
  id: string;
  groupName: string;
  technologies: Technology[];
}

export interface SkillsData {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  technologyGroups: TechnologyGroup[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string | null;
  projectUrl: string | null;
  technologies: Technology[];
}

export interface ProjectsSection {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  projects: Project[];
}

export interface HeroData {
  id: number;
  greeting: string;
  name: string;
  description: string;
  "link-curriculum": string;
}

export interface FooterData {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  "link-github": string | null;
  "link-linkedin": string | null;
  "link-x": string | null;
  "link-email": string | null;
}

export interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  year: number;
  issuer: string | null;
}

export interface EducationData {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  education: EducationItem[];
  certifications: CertificationItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AboutData {
  id: number;
  title: string;
  content: string;
  quote: string;
  quoteAuthor: string;
  hobbies: string;
}

// --- Hooks ---

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get<{ docs: Category[] }>("categories");
      return response.docs || [];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

interface UsePostsParams {
  page?: number;
  category?: string;
  limit?: number;
  search?: string; // Note: Server-side search would be better, but keeping current logic if needed
}

export const usePosts = ({ page = 1, category = "todos", limit, search }: UsePostsParams = {}) => {
  return useQuery({
    queryKey: ["posts", { page, category, limit, search }],
    queryFn: async () => {
      let endpoint = `posts?page=${page}`;
      
      if (limit) {
        endpoint += `&limit=${limit}`;
      }
      
      if (category !== "todos") {
        endpoint += `&where[category.slug][equals]=${category}`;
      }
      
      // Note: If the backend supports search via query params, append it here.
      // Example: if (search) endpoint += `&where[title][like]=${search}`;
      
      return api.get<PaginatedResponse<Post>>(endpoint);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData, // Keep showing previous data while fetching new page
  });
};

export const useArticle = (slug?: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const response = await api.get<{ docs: Post[] }>(`posts?where[slug][equals]=${slug}`);
      return response.docs?.[0] || null;
    },
    enabled: !!slug, // Only run if slug is present
    staleTime: 1000 * 60 * 30, // 30 minutes (articles don't change often)
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await api.get<{ docs: SkillsData[] }>("skills");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await api.get<{ docs: ProjectsSection[] }>("projects");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useHero = () => {
  return useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await api.get<{ docs: HeroData[] }>("hero");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const response = await api.get<{ docs: FooterData[] }>("footer");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useEducation = () => {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const response = await api.get<{ docs: EducationData[] }>("education");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await api.get<{ docs: AboutData[] }>("about");
      return response.docs?.[0] || null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useContactMutation = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => {
      return api.post("contact", data);
    },
  });
};
