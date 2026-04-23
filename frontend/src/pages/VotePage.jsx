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

  if (!poll) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      <VoteOptions pollId={pollId} options={poll.options} onVoted={() => setVoted(true)} />
      <h3 className="text-lg font-semibold mt-6 mb-2">Live Results</h3>
      <ul>
        {poll.options.map((opt, idx) => (
          <li key={idx} className="mb-1">
            {opt}: <span className="font-bold">{results[idx] || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotePage;
