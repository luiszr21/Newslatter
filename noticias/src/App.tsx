import { useState } from 'react';
import { Header } from './components/cabecalho';
import { CategoryTabs } from './components/categorias';
import { NewsCard } from './components/card';
import { fetchNews } from './services/api';
import type { CategoryNews } from './services/api';
import type { Category } from './types/news';

export default function App() {
  const [news, setNews] = useState<CategoryNews[]>([]);
  const [category, setCategory] = useState<Category>('technology');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRefresh() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNews();
      setNews(data);
    } catch {
      setError('Erro ao buscar notícias. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  const currentNews = news.find(n => n.category === category);

  return (
    <div className="min-h-screen bg-[#071022]">
      <Header onRefresh={handleRefresh} isLoading={isLoading} />
      <CategoryTabs selected={category} onChange={setCategory} />

      <main className="px-8 pb-8">
        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        {news.length === 0 && !isLoading && (
          <p className="text-gray-400 text-center mt-20">
            Clique em "Atualizar Notícias" para carregar.
          </p>
        )}

        {isLoading && (
          <p className="text-gray-400 text-center mt-20">Carregando notícias...</p>
        )}

        {currentNews && (
          <div className="grid grid-cols-3 gap-6">
            {currentNews.articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                category={category}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}