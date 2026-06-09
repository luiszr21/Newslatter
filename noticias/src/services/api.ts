import type { NewsResponse, Category } from '../types/News';

const WEBHOOK_URL = 'https://luiszr21.app.n8n.cloud/webhook/noticias';

export async function fetchNews(): Promise<NewsResponse[]> {
  const response = await fetch(WEBHOOK_URL);

  if (!response.ok) {
    throw new Error('Erro ao buscar notícias');
  }

  const data = await response.json();
  return data;
}

export function filterByCategory(data: NewsResponse[], category: Category): NewsResponse {
  const categoryMap: Record<Category, string> = {
    technology: 'technology',
    general: 'general',
    sports: 'sports',
  };

  return data.find((_, index) => index === Object.keys(categoryMap).indexOf(category)) || data[0];
}