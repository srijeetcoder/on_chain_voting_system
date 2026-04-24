import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import VotePage from "./pages/VotePage";
import { ConnectWalletButton } from "./components/ConnectWalletButton";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-radial-lighting flex flex-col text-foreground selection:bg-accent/30 overflow-x-hidden">
        {/* Background Layers */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-grid"></div>
          <div className="blob blob-primary"></div>
          <div className="blob blob-secondary"></div>
          <div className="blob blob-tertiary"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background-base/80 backdrop-blur-xl border-b border-white/[0.06]">
            <Link to="/" className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80">
              NexusPoll
            </Link>
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200">
                Home
              </Link>
              <Link to="/create" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200">
                Create Poll
              </Link>
              <ConnectWalletButton />
            </nav>
          </header>
          
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-700 slide-in-from-bottom-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePollPage />} />
              <Route path="/vote/:pollId" element={<VotePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
