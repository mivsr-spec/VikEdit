/**
 * Types and Interfaces for VikEdit
 */

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  italicWord: string;
  description: string;
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  imageUrl: string;
  overlayText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconType: "short" | "social" | "paid";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}
