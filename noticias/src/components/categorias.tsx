import type { Category } from '../types/news';

interface CategoryTabsProps {
  selected: Category;
  onChange: (category: Category) => void;
}

const categories: { label: string; value: Category }[] = [
  { label: 'Esportes', value: 'sports' },
  { label: 'Tecnologia', value: 'technology' },
  { label: 'Mundo', value: 'general' },
];

export function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-4 justify-center my-6">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            selected === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-[#0a1628] text-gray-400 hover:text-white'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}