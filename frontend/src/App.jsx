import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import VotePage from "./pages/VotePage";
import { ConnectWalletButton } from "./components/ConnectWalletButton";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h1 className="text-xl font-bold">On-Chain Voting System</h1>
          <nav className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/create">Create Poll</Link>
          </nav>
          <ConnectWalletButton />
        </header>
        <main className="p-4">
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
