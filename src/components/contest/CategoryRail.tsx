import type { Category } from '../../types';
import { categories } from '../../data/categories';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../common/Button';

export function CategoryRail({
  selected,
  onSelect,
}: {
  selected: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}) {
  const { categoryLabel } = useLanguage();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {(['All', ...categories] as Array<Category | 'All'>).map((category) => (
        <Button
          key={category}
          variant={selected === category ? 'secondary' : 'ghost'}
          className="shrink-0"
          onClick={() => onSelect(category)}
        >
          {categoryLabel(category)}
        </Button>
      ))}
    </div>
  );
}
