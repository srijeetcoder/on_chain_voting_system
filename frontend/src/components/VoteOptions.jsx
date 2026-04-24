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
    <div className="flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded text-sm animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`
              relative w-full text-left px-6 py-4 rounded-xl border transition-all duration-200 overflow-hidden
              ${selected === idx 
                ? "bg-accent/10 border-accent text-accent-bright shadow-[inset_0_0_20px_rgba(94,106,210,0.1)]" 
                : "bg-white/[0.02] border-white/10 text-foreground hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-0.5"
              }
            `}
            onClick={() => setSelected(idx)}
          >
            <span className="relative z-10 font-medium">{opt}</span>
            {selected === idx && (
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-accent-bright font-bold animate-in zoom-in-50 duration-200">
                ✓
              </span>
            )}
            {selected === idx && (
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 w-[200%] animate-[shimmer_2s_infinite]"></div>
            )}
          </button>
        ))}
      </div>
      <button
        className="w-full mt-2 px-4 py-3.5 text-sm font-semibold text-white bg-accent rounded-lg shadow-glow shadow-inner-highlight transition-all duration-200 hover:bg-accent-bright hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
        onClick={handleVote}
        disabled={selected === null || loading}
      >
        {loading ? "Submitting Vote..." : "Cast Vote"}
      </button>
    </div>
  );
}
