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
      for (let i = 0; i < pollCount; i++) {
        try {
          const poll = await fetchPoll(i);
          pollList.push({ ...poll, id: i });
        } catch (err) {
          console.error("Failed to fetch poll", i, err);
        }
      }
      setPolls(pollList);
    }
    loadPolls();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.03em] text-gradient">
          Active Polls
        </h2>
        <p className="text-lg md:text-xl text-foreground-muted max-w-2xl leading-relaxed">
          Cast your vote transparently on the blockchain.
        </p>
      </div>
      
      {polls.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px] rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-card">
          <p className="text-foreground-muted text-lg">No polls available yet. Why not create one?</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[auto]">
          {polls.map((poll, idx) => (
            <div key={poll.id} className={`lg:col-span-${idx % 3 === 0 ? 4 : (idx % 3 === 1 ? 2 : 3)}`}>
              <PollCard poll={poll} pollId={poll.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
