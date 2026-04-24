import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPoll, fetchResults } from "../utils/soroban.js";
import { VoteOptions } from "../components/VoteOptions";

function VotePage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    async function loadPoll() {
      const p = await fetchPoll(pollId);
      setPoll(p);
      const r = await fetchResults(pollId);
      setResults(r);
    }
    loadPoll();
  }, [pollId, voted]);

  if (!poll) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  const totalVotes = results.reduce((acc, curr) => acc + Number(curr || 0), 0);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 className="page-title">{poll.question}</h2>
      <p className="page-subtitle">Cast your vote transparently.</p>
      
      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
        <div className="glass-panel">
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Options</h3>
          <VoteOptions pollId={pollId} options={poll.options} onVoted={() => setVoted(true)} />
        </div>
        
        <div className="glass-panel">
          <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>Live Results</h3>
          <ul style={{ listStyle: "none" }}>
            {poll.options.map((opt, idx) => {
              const count = Number(results[idx] || 0);
              const percentage = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
              return (
                <li key={idx} style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span>{opt}</span>
                    <span style={{ fontWeight: "bold" }}>{count} votes ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="results-bar-container">
                    <div className="results-bar" style={{ width: `${percentage}%` }}></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VotePage;
