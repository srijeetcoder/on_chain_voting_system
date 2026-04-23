import React, { useState } from "react";
import { vote } from "../utils/soroban.js";

export function VoteOptions({ pollId, options, onVoted }) {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (selected === null) return;
    setLoading(true);
    await vote(pollId, selected);
    setLoading(false);
    if (onVoted) onVoted();
  };

  return (
    <div className="my-4">
      {options.map((opt, idx) => (
        <label key={idx} className="block mb-2">
          <input
            type="radio"
            name="vote"
            value={idx}
            checked={selected === idx}
            onChange={() => setSelected(idx)}
            className="mr-2"
          />
          {opt}
        </label>
      ))}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleVote}
        disabled={selected === null || loading}
      >
        {loading ? "Voting..." : "Vote"}
      </button>
    </div>
  );
}
