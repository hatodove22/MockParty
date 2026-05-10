export type Category =
  | 'SaaS screens'
  | 'Business apps'
  | 'LP / Web'
  | 'AI tools'
  | 'Research / Education'
  | 'Internal DX'
  | 'Booking / CRM';

export type ContestStatus = 'Open' | 'Finalist' | 'Completed';

export interface Contest {
  id: number;
  title: string;
  category: Category;
  prize: string;
  entries: number;
  creators: number;
  daysLeft: number;
  status: ContestStatus;
  guaranteed: boolean;
  private: boolean;
  featured: boolean;
  client: string;
  color: string;
  brief: string;
  deliverables: string[];
}

export interface Entry {
  id: number;
  contestId: number;
  title: string;
  creator: string;
  rating: 1 | 2 | 3 | 4 | 5;
  score: number;
  finalist: boolean;
  winner: boolean;
  comments: number;
  views: number;
  tags: string[];
  gradient: string;
  review: string;
}

export interface ContestPackage {
  name: 'Starter' | 'Standard' | 'Premium';
  price: string;
  entries: string;
  days: string;
  description: string;
  features: string[];
  recommended?: boolean;
}
