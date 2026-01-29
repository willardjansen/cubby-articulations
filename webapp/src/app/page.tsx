'use client';

import { useState, useMemo } from 'react';
import librariesData from '@/lib/libraries.json';
import { LibraryCard } from '@/components/LibraryCard';
import { FilterBar } from '@/components/FilterBar';

interface Library {
  path: string;
  name: string;
  developer: string;
  category?: string;
  exports?: string[];
  tags?: string[];
  website?: string;
  attribution?: {
    original_author?: string;
    author?: string;
    license?: string;
    original_license?: string;
  };
}

const libraries = librariesData as Library[];

export default function Home() {
  const [search, setSearch] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [dawFilter, setDawFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const developers = useMemo(() => {
    return [...new Set(libraries.map(l => l.developer))].sort();
  }, []);

  const daws = useMemo(() => {
    const allDaws = libraries.flatMap(l => l.exports || []);
    return [...new Set(allDaws)].sort();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(libraries.map(l => l.category).filter(Boolean))].sort();
  }, []);

  const filtered = useMemo(() => {
    return libraries.filter(lib => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const searchable = [
          lib.name,
          lib.developer,
          lib.category,
          ...(lib.tags || [])
        ].join(' ').toLowerCase();
        if (!searchable.includes(searchLower)) return false;
      }

      // Developer filter
      if (developerFilter && lib.developer !== developerFilter) return false;

      // DAW filter
      if (dawFilter && !lib.exports?.includes(dawFilter)) return false;

      // Category filter
      if (categoryFilter && lib.category !== categoryFilter) return false;

      return true;
    });
  }, [search, developerFilter, dawFilter, categoryFilter]);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cubby-pink to-cubby-purple bg-clip-text text-transparent">
          Expression Map Database
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Free, open-source expression maps and articulation sets for Cubase, Logic Pro, Studio One, and more.
          Download ready-to-use files or contribute your own.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        developer={developerFilter}
        onDeveloperChange={setDeveloperFilter}
        developers={developers}
        daw={dawFilter}
        onDawChange={setDawFilter}
        daws={daws}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories as string[]}
      />

      <div className="mb-4 text-sm text-gray-500">
        Showing {filtered.length} of {libraries.length} libraries
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(lib => (
          <LibraryCard key={lib.path} library={lib} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No libraries found matching your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setDeveloperFilter('');
              setDawFilter('');
              setCategoryFilter('');
            }}
            className="mt-4 text-cubby-pink hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
