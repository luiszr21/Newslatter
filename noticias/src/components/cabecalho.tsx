interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function Header({ onRefresh, isLoading }: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-8 py-6">
      <h1 className="text-white text-2xl font-bold tracking-widest uppercase">
        Noticias do Dia
      </h1>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="border border-white text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-[#0a1628] transition-all disabled:opacity-50"
      >
        {isLoading ? 'Atualizando...' : 'Atualizar Notícias'}
      </button>
    </div>
  );
}