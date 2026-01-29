'use client';

import { useState } from 'react';

export default function RequestPage() {
  const [libraryName, setLibraryName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [daw, setDaw] = useState('cubase');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const generateIssueUrl = () => {
    const title = encodeURIComponent(`[Request] ${libraryName} by ${developer}`);
    const body = encodeURIComponent(`## Library Request

**Library Name:** ${libraryName}
**Developer:** ${developer}
**Requested Format:** ${daw}

### Additional Information
${additionalInfo || 'None provided'}

---
*Submitted via [articulations.cubbycomposer.com](https://articulations.cubbycomposer.com)*`);

    return `https://github.com/willardjansen/cubby-articulations/issues/new?title=${title}&body=${body}&labels=request`;
  };

  const canSubmit = libraryName.trim() && developer.trim();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cubby-pink to-cubby-purple bg-clip-text text-transparent">
          Request a Library
        </h1>
        <p className="text-gray-400">
          Can't find an expression map for your library? Request it here and the community may create one.
        </p>
      </div>

      <div className="bg-white/5 rounded-xl p-8 border border-white/10">
        <div className="space-y-6">
          <div>
            <label htmlFor="libraryName" className="block text-sm font-medium mb-2">
              Library Name <span className="text-cubby-pink">*</span>
            </label>
            <input
              type="text"
              id="libraryName"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
              placeholder="e.g., Berlin Strings"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cubby-pink transition-colors"
            />
          </div>

          <div>
            <label htmlFor="developer" className="block text-sm font-medium mb-2">
              Developer <span className="text-cubby-pink">*</span>
            </label>
            <input
              type="text"
              id="developer"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              placeholder="e.g., Orchestral Tools"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cubby-pink transition-colors"
            />
          </div>

          <div>
            <label htmlFor="daw" className="block text-sm font-medium mb-2">
              Preferred Format
            </label>
            <select
              id="daw"
              value={daw}
              onChange={(e) => setDaw(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cubby-pink transition-colors"
            >
              <option value="cubase">Cubase Expression Map</option>
              <option value="logic">Logic Pro Articulation Set</option>
              <option value="studio-one">Studio One Sound Variations</option>
              <option value="dorico">Dorico Expression Map</option>
              <option value="reaper">Reaper Reabanks</option>
              <option value="any">Any format</option>
            </select>
          </div>

          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any specific articulations or features you need? Link to the library's product page?"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cubby-pink transition-colors resize-none"
            />
          </div>

          <a
            href={canSubmit ? generateIssueUrl() : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!canSubmit) {
                e.preventDefault();
                alert('Please fill in the library name and developer.');
              }
            }}
            className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-cubby-pink to-cubby-purple hover:opacity-90'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Submit Request on GitHub
          </a>

          <p className="text-sm text-gray-500 text-center">
            This will open a new GitHub issue. You'll need a GitHub account to submit.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-cubby-purple/10 rounded-xl p-6 border border-cubby-purple/20">
        <h2 className="text-lg font-semibold mb-3">Want to contribute instead?</h2>
        <p className="text-gray-400 text-sm mb-4">
          If you already have expression maps or can create them, consider contributing directly to the project!
        </p>
        <a
          href="https://github.com/willardjansen/cubby-articulations/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cubby-pink hover:underline text-sm"
        >
          Read the contribution guide →
        </a>
      </div>
    </div>
  );
}
