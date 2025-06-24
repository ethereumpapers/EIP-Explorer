export interface EIP {
  number: number;
  title: string;
  author: string[];
  status: 'Draft' | 'Review' | 'Last Call' | 'Final' | 'Stagnant' | 'Withdrawn' | 'Living';
  type: 'Standards Track' | 'Meta' | 'Informational';
  category?: 'Core' | 'Networking' | 'Interface' | 'ERC';
  created: string;
  updated?: string;
  description: string;
  content: string;
  discussions?: string;
  requires?: number[];
  supersededBy?: number[];
  replaces?: number[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website: string;
  github?: string;
  eipNumbers: number[];
  implementationDetails: string;
  status: 'Active' | 'Beta' | 'Deprecated';
}

export interface Discussion {
  id: string;
  eipNumber: number;
  author: string;
  content: string;
  timestamp: string;
  replies: Discussion[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  eipNumbers: number[];
  summary: string;
}

export interface LiveData {
  eipNumber: number;
  metrics: {
    adoptionRate: number;
    transactionVolume: string;
    gasUsage: string;
    activeProjects: number;
  };
  charts: {
    adoptionOverTime: Array<{ date: string; value: number }>;
    gasUsageOverTime: Array<{ date: string; value: number }>;
  };
}