import type { ContestPackage } from '../types';

export const packages: ContestPackage[] = [
  {
    name: 'Starter',
    price: '$700',
    entries: '3-5 entries',
    days: '5 days',
    description: 'Best for a quick direction check before deeper design work.',
    features: ['Public brief', 'Basic comparison', 'Creator notes'],
  },
  {
    name: 'Standard',
    price: '$1,400',
    entries: '5-8 entries',
    days: '7 days',
    description: 'Recommended for serious UX exploration with clearer feedback.',
    features: ['Guaranteed prize', 'Feedback cards', 'Finalist shortlist'],
    recommended: true,
  },
  {
    name: 'Premium',
    price: '$2,400',
    entries: '8-12 entries',
    days: '10 days',
    description: 'For complex flows and multiple screen-state comparisons.',
    features: ['Featured listing', 'Private option', 'Review summary'],
  },
];
