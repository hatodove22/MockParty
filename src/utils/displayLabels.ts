import type { ContestPackage, ContestStatus } from '../types';

type Language = 'en' | 'ja';

const packageLabels: Record<Language, Record<ContestPackage['name'], string>> = {
  en: {
    Starter: 'Starter',
    Standard: 'Standard',
    Premium: 'Premium',
  },
  ja: {
    Starter: 'スターター',
    Standard: 'スタンダード',
    Premium: 'プレミアム',
  },
};

const statusLabels: Record<Language, Record<ContestStatus | 'All', string>> = {
  en: {
    All: 'All',
    Open: 'Open',
    Finalist: 'Finalist',
    Completed: 'Completed',
  },
  ja: {
    All: 'すべて',
    Open: '募集中',
    Finalist: '選考中',
    Completed: '完了',
  },
};

export function packageLabel(name: ContestPackage['name'], language: Language) {
  return packageLabels[language][name];
}

export function statusLabel(status: ContestStatus | 'All', language: Language) {
  return statusLabels[language][status];
}
