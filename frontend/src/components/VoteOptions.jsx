import React, { useState } from "react";
import { vote } from "../utils/soroban.js";

export function VoteOptions({ pollId, options, onVoted }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = async () => {
    if (selected === null) return;
    setLoading(true);
    setError(null);
    try {
      await vote(pollId, selected);
      if (onVoted) onVoted();
    } catch (err) {
      console.error(err);
      setError(`Failed to cast vote: ${err.message || err.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`vote-option-btn ${selected === idx ? "selected" : ""}`}
            style={{
              borderColor: selected === idx ? "var(--primary)" : "var(--border-light)",
              background: selected === idx ? "rgba(30, 41, 59, 0.8)" : "rgba(15, 23, 42, 0.6)",
            }}
            onClick={() => setSelected(idx)}
          >
            {opt}
            {selected === idx && (
              <span style={{ float: "right", color: "var(--primary)" }}>✓</span>
            )}
          </button>
        ))}
      </div>
      <button
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "1rem" }}
        onClick={handleVote}
        disabled={selected === null || loading}
      >
        {loading ? "Submitting Vote..." : "Cast Vote"}
      </button>
    </div>
  );
}
