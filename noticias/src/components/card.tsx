import { useEffect, useState } from 'react';
import type { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
  category: string;
}

export function NewsCard({ article, category }: NewsCardProps) {
  const [timeLabel, setTimeLabel] = useState('');

  useEffect(() => {
    const updateTimeLabel = () => {
      const publishedAt = new Date(article.publishedAt).getTime();

      if (Number.isNaN(publishedAt)) {
        setTimeLabel('');
        return;
      }

      const diff = Math.floor((Date.now() - publishedAt) / 60000);

      if (diff < 60) {
        setTimeLabel(`Há ${diff} min atrás`);
        return;
      }

      if (diff < 1440) {
        setTimeLabel(`Há ${Math.floor(diff / 60)}h atrás`);
        return;
      }

      setTimeLabel(`Há ${Math.floor(diff / 1440)} dias atrás`);
    };

    updateTimeLabel();

    const intervalId = window.setInterval(updateTimeLabel, 60000);

    return () => window.clearInterval(intervalId);
  }, [article.publishedAt]);

  return (
    <div className="bg-[#0a1628] rounded-lg overflow-hidden flex flex-col">
      <img
        src={article.urlToImage || 'https://placehold.co/400x200?text=Sem+Imagem'}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <span className="text-blue-400 text-xs font-semibold uppercase">{category}</span>
        <h2 className="text-white font-bold text-sm leading-snug">{article.title}</h2>
        <p className="text-gray-400 text-xs line-clamp-2">{article.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500 text-xs">{timeLabel}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-xs font-semibold hover:underline"
          >
            Ler notícia →
          </a>
        </div>
      </div>
    </div>
  );
}