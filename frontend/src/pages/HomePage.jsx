import React, { useEffect, useState } from "react";
import { fetchPoll, fetchResults } from "../utils/soroban.js";
import { PollCard } from "../components/PollCard";

function HomePage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function loadPolls() {
      let pollList = [];
      let pollCount = 0;
      try {
        pollCount = await fetchPoll("count");
      } catch {
        pollCount = 0;
      }
      for (let i = 1; i <= pollCount; i++) {
        const poll = await fetchPoll(i);
        pollList.push({ ...poll, id: i });
      }
      setPolls(pollList);
    }
    loadPolls();
  }, []);

  return (
    <div>
      <h2 className="page-title">Active Polls</h2>
      <p className="page-subtitle">Cast your vote transparently on the blockchain.</p>
      
      {polls.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No polls available yet. Why not create one?</p>
        </div>
      ) : (
        <div className="polls-grid">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} pollId={poll.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
