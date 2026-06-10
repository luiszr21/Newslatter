import type { Article, Category } from '../types/news';

const WEBHOOK_URL = 'https://luiszr21.app.n8n.cloud/webhook/noticias';

export interface CategoryNews {
  category: Category;
  articles: Article[];
}

export async function fetchNews(): Promise<CategoryNews[]> {
  const response = await fetch(WEBHOOK_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Erro ao buscar notícias');
  }

  const data = await response.json();
    console.log('Dados do N8N:', JSON.stringify(data));


  const categoryOrder: Category[] = ['technology', 'general', 'sports'];

  return categoryOrder.map((category, index) => ({
    category,
    articles: data[index]?.articles || [],
  }));
}