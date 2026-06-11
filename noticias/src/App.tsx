import { useState, useEffect, useRef } from 'react';
import { Header } from './components/cabecalho';
import { CategoryTabs } from './components/categorias';
import { NewsCard } from './components/card';
import { fetchNews, type CategoryNews } from './services/api';
import type { Category } from './types/news';

const PAGE_SIZE = 9;

export default function App() {
  const [news, setNews] = useState<CategoryNews[]>([]);
  const [category, setCategory] = useState<Category>('technology');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleRefresh();
  }, []);
    
  async function handleRefresh() {
    setIsLoading(true);
    setError(null);
    setPage(1);
    try {
      const data = await fetchNews();
      setNews(data);
    } catch {
      setError('Erro ao buscar notícias. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    setPage(1);
  }

  const currentNews = news.find(n => n.category === category);
  const visibleArticles = currentNews?.articles.slice(0, page * PAGE_SIZE) || [];
  const hasMore = visibleArticles.length < (currentNews?.articles.length || 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="min-h-screen bg-[#071022]">
      <Header onRefresh={handleRefresh} isLoading={isLoading} />
      <CategoryTabs selected={category} onChange={handleCategoryChange} />

      <main className="px-8 pb-8">
        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        {news.length === 0 && !isLoading && (
          <p className="text-gray-400 text-center mt-20">
            Clique em "Atualizar Notícias" para carregar.
          </p>
        )}

        {isLoading && page === 1 && (
          <p className="text-gray-400 text-center mt-20">Carregando notícias...</p>
        )}

        <div className="grid grid-cols-3 gap-6">
          {visibleArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              category={category}
            />
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center mt-8">
            <p className="text-gray-400 text-sm">Carregando mais notícias...</p>
          </div>
        )}

        {!hasMore && visibleArticles.length > 0 && (
          <p className="text-gray-400 text-center mt-8 text-sm">
            Você viu todas as notícias!
          </p>
        )}
      </main>
    </div>
  );
}