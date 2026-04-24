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
      setResults(p.vote_counts || []);
    }
    loadPoll();
  }, [pollId, voted]);

  if (!poll) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;

  const totalVotes = results.reduce((acc, curr) => acc + Number(curr || 0), 0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-gradient break-words">
          {poll.question}
        </h2>
        <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
          Cast your vote transparently.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-card">
          <h3 className="text-xl font-semibold tracking-tight text-foreground mb-6">Options</h3>
          <VoteOptions pollId={pollId} options={poll.options} onVoted={() => setVoted(true)} />
        </div>
        
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-card">
          <h3 className="text-xl font-semibold tracking-tight text-foreground mb-6">Live Results</h3>
          <ul className="space-y-6">
            {poll.options.map((opt, idx) => {
              const count = Number(results[idx] || 0);
              const percentage = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
              return (
                <li key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-medium text-foreground">{opt}</span>
                    <span className="text-foreground-muted font-mono tracking-wide">{count} votes ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden shadow-[0_0_12px_rgba(94,106,210,0.8)]" 
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] animate-[shimmer_2s_infinite]"></div>
                    </div>
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
