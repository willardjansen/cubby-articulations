import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cubby Articulations - Expression Map Database",
  description: "Free, open-source database of expression maps and articulation sets for DAWs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cubby-dark text-white antialiased">
        <header className="border-b border-white/10 bg-cubby-dark/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-cubby-pink to-cubby-purple bg-clip-text text-transparent">
              Cubby Articulations
            </a>
            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:text-cubby-pink transition-colors">Browse</a>
              <a href="/request" className="hover:text-cubby-pink transition-colors">Request</a>
              <a href="/api-docs" className="hover:text-cubby-pink transition-colors">API</a>
              <a href="https://github.com/willardjansen/cubby-articulations" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">GitHub</a>
              <a href="https://vi-control.net/community/threads/cubby-articulations-free-open-source-expression-map-database-community-project.169892/" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">VI-Control</a>
              <a href="https://github.com/willardjansen/cubby-articulations/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">Contribute</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-sm text-gray-500">
          <p>Cubby Articulations is part of the <a href="https://cubbycomposer.com" className="text-cubby-pink hover:underline">Cubby Composer</a> ecosystem</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/willardjansen/cubby-articulations" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">GitHub</a>
            <a href="https://vi-control.net/community/threads/cubby-articulations-free-open-source-expression-map-database-community-project.169892/" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">VI-Control</a>
            <a href="https://forums.steinberg.net/t/free-open-source-expression-map-database-cubby-articulations-community-project/1022305" target="_blank" rel="noopener noreferrer" className="hover:text-cubby-pink transition-colors">Steinberg Forums</a>
          </div>
          <p className="mt-4">MIT License - Free and Open Source</p>
        </footer>
      </body>
    </html>
  );
}
