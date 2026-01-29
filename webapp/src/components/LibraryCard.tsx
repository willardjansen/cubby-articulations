'use client';

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

interface Props {
  library: Library;
}

const DAW_LABELS: Record<string, string> = {
  cubase: 'Cubase',
  logic: 'Logic Pro',
  'studio-one': 'Studio One',
  dorico: 'Dorico',
  reaper: 'Reaper',
};

const DAW_COLORS: Record<string, string> = {
  cubase: 'bg-orange-500/20 text-orange-400',
  logic: 'bg-gray-500/20 text-gray-300',
  'studio-one': 'bg-blue-500/20 text-blue-400',
  dorico: 'bg-green-500/20 text-green-400',
  reaper: 'bg-red-500/20 text-red-400',
};

export function LibraryCard({ library }: Props) {
  const REPO_URL = 'https://github.com/willardjansen/cubby-articulations';
  const downloadUrl = `${REPO_URL}/tree/main/libraries/${library.path}/exports`;

  return (
    <div className="bg-cubby-card rounded-lg border border-white/10 p-4 hover:border-cubby-pink/50 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{library.name}</h3>
        {library.category && (
          <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-400">
            {library.category}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-3">{library.developer}</p>

      {library.exports && library.exports.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {library.exports.map(daw => (
            <span
              key={daw}
              className={`text-xs px-2 py-1 rounded ${DAW_COLORS[daw] || 'bg-white/10 text-gray-400'}`}
            >
              {DAW_LABELS[daw] || daw}
            </span>
          ))}
        </div>
      )}

      {library.tags && library.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {library.tags.slice(0, 5).map(tag => (
            <span key={tag} className="text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
        <a
          href={downloadUrl}
          target="_blank"
          className="flex-1 text-center text-sm py-2 bg-gradient-to-r from-cubby-pink to-cubby-purple rounded hover:opacity-90 transition-opacity"
        >
          Download
        </a>
        {library.website && (
          <a
            href={library.website}
            target="_blank"
            className="px-3 py-2 text-sm border border-white/20 rounded hover:border-white/40 transition-colors"
            title="Library website"
          >
            ↗
          </a>
        )}
      </div>

      {library.attribution && (
        <p className="text-xs text-gray-600 mt-3">
          by {library.attribution.original_author || library.attribution.author}
          {' · '}
          {library.attribution.original_license || library.attribution.license}
        </p>
      )}
    </div>
  );
}
