import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { StatusPanel } from '../components/common/StatusPanel';
import { useLanguage } from '../i18n/LanguageContext';

const copy = {
  en: {
    title: 'This page is not available.',
    description: 'The route may have moved, or the contest link may no longer match a page in this prototype.',
    browse: 'Browse contests',
    home: 'Back home',
  },
  ja: {
    title: 'このページは利用できません。',
    description: 'ルートが移動したか、このプロトタイプ内のページとリンクが一致していない可能性があります。',
    browse: 'コンテストを見る',
    home: 'ホームへ戻る',
  },
} as const;

export function NotFoundPage() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <main>
      <StatusPanel
        eyebrow="404"
        title={text.title}
        description={text.description}
        actions={
          <>
            <Link to="/contests">
              <Button>{text.browse}</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">{text.home}</Button>
            </Link>
          </>
        }
      />
    </main>
  );
}
