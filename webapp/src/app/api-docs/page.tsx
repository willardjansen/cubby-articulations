export default function APIDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cubby-pink to-cubby-purple bg-clip-text text-transparent">
          API Documentation
        </h1>
        <p className="text-gray-400">
          Free API for programmatic access to the expression map database.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Base URL</h2>
          <code className="block bg-black/40 p-4 rounded-lg text-cubby-pink font-mono">
            https://articulations.cubbycomposer.com/api/v1
          </code>
        </section>

        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Endpoints</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-cubby-pink mb-2">
                GET /libraries.json
              </h3>
              <p className="text-gray-400 mb-3">
                Returns a list of all available libraries with basic metadata.
              </p>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "version": "1.0",
  "generated": "2026-01-29T10:00:00.000Z",
  "count": 19,
  "libraries": [
    {
      "path": "vsl/synchron-brass",
      "name": "Synchron Brass",
      "developer": "Vienna Symphonic Library",
      "category": "brass",
      "exports": ["cubase"],
      "tags": ["brass", "orchestral", "synchron"]
    },
    ...
  ]
}`}
              </code>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cubby-pink mb-2">
                GET /libraries/&#123;developer&#125;/&#123;library&#125;.json
              </h3>
              <p className="text-gray-400 mb-3">
                Returns detailed information about a specific library, including download URLs.
              </p>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "path": "vsl/synchron-brass",
  "name": "Synchron Brass",
  "developer": "Vienna Symphonic Library",
  "category": "brass",
  "exports": ["cubase"],
  "tags": ["brass", "orchestral"],
  "website": "https://www.vsl.co.at/",
  "attribution": {
    "original_author": "Jared Thirsk",
    "original_license": "Unlicense"
  },
  "downloads": {
    "cubase": {
      "count": 15,
      "files": [
        {
          "name": "SYB Bass trombone.expressionmap",
          "url": "https://github.com/.../SYB%20Bass%20trombone.expressionmap"
        },
        ...
      ]
    }
  },
  "github": "https://github.com/.../vsl/synchron-brass"
}`}
              </code>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cubby-pink mb-2">
                GET /developers.json
              </h3>
              <p className="text-gray-400 mb-3">
                Returns all developers with their libraries grouped.
              </p>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "version": "1.0",
  "count": 6,
  "developers": [
    {
      "name": "Vienna Symphonic Library",
      "libraries": [
        { "path": "vsl/synchron-brass", "name": "Synchron Brass", ... },
        ...
      ]
    },
    ...
  ]
}`}
              </code>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-cubby-pink mb-2">
                GET /categories.json
              </h3>
              <p className="text-gray-400 mb-3">
                Returns libraries grouped by category (strings, brass, woodwinds, etc.).
              </p>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "version": "1.0",
  "categories": {
    "strings": [
      { "path": "vsl/synchron-strings-pro", "name": "Synchron Strings Pro", ... }
    ],
    "brass": [
      { "path": "vsl/synchron-brass", "name": "Synchron Brass", ... }
    ],
    ...
  }
}`}
              </code>
            </div>
          </div>
        </section>

        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Usage Examples</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">JavaScript/TypeScript</h3>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`const response = await fetch(
  'https://articulations.cubbycomposer.com/api/v1/libraries.json'
);
const data = await response.json();
console.log(data.libraries);`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">cURL</h3>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`curl https://articulations.cubbycomposer.com/api/v1/libraries.json`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Download a file</h3>
              <code className="block bg-black/40 p-4 rounded-lg text-sm font-mono overflow-x-auto">
{`# Get library info with download URLs
curl https://articulations.cubbycomposer.com/api/v1/libraries/vsl/synchron-brass.json

# Download an expression map directly
curl -LO "https://github.com/.../SYB%20Bass%20trombone.expressionmap"`}
              </code>
            </div>
          </div>
        </section>

        <section className="bg-cubby-purple/10 rounded-xl p-6 border border-cubby-purple/20">
          <h2 className="text-xl font-bold mb-3">Rate Limits &amp; Terms</h2>
          <ul className="space-y-2 text-gray-400">
            <li>- No authentication required</li>
            <li>- No rate limits (static files served via CDN)</li>
            <li>- Free for any use, commercial or personal</li>
            <li>- Attribution appreciated but not required</li>
            <li>- Individual expression maps have their own licenses (see attribution field)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
