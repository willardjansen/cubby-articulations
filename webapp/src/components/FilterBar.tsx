'use client';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  developer: string;
  onDeveloperChange: (value: string) => void;
  developers: string[];
  daw: string;
  onDawChange: (value: string) => void;
  daws: string[];
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

const DAW_LABELS: Record<string, string> = {
  cubase: 'Cubase',
  logic: 'Logic Pro',
  'studio-one': 'Studio One',
  dorico: 'Dorico',
  reaper: 'Reaper',
};

export function FilterBar({
  search,
  onSearchChange,
  developer,
  onDeveloperChange,
  developers,
  daw,
  onDawChange,
  daws,
  category,
  onCategoryChange,
  categories,
}: Props) {
  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search libraries, instruments, tags..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 bg-cubby-card border border-white/10 rounded-lg focus:outline-none focus:border-cubby-pink/50 transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={developer}
          onChange={(e) => onDeveloperChange(e.target.value)}
          className="px-3 py-2 bg-cubby-card border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cubby-pink/50"
        >
          <option value="">All Developers</option>
          {developers.map(dev => (
            <option key={dev} value={dev}>{dev}</option>
          ))}
        </select>

        <select
          value={daw}
          onChange={(e) => onDawChange(e.target.value)}
          className="px-3 py-2 bg-cubby-card border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cubby-pink/50"
        >
          <option value="">All DAWs</option>
          {daws.map(d => (
            <option key={d} value={d}>{DAW_LABELS[d] || d}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 bg-cubby-card border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cubby-pink/50"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {(developer || daw || category) && (
          <button
            onClick={() => {
              onDeveloperChange('');
              onDawChange('');
              onCategoryChange('');
            }}
            className="px-3 py-2 text-sm text-cubby-pink hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
