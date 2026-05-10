import { Star } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function RatingStars({ rating }: { rating: number }) {
  const { language } = useLanguage();
  const label = language === 'ja' ? `5段階中${rating}の評価` : `${rating} of 5 stars`;

  return (
    <div className="flex gap-0.5" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={15}
          className={index < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
        />
      ))}
    </div>
  );
}
