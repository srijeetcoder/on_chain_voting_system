import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import VotePage from "./pages/VotePage";
import { ConnectWalletButton } from "./components/ConnectWalletButton";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="nav-header">
          <Link to="/" className="nav-brand">On-Chain Voting System</Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create" className="nav-link">Create Poll</Link>
          </nav>
          <ConnectWalletButton />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePollPage />} />
            <Route path="/vote/:pollId" element={<VotePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
