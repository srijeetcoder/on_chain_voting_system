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
      <h2 className="text-xl font-bold mb-4">Polls</h2>
      {polls.length === 0 && <div>No polls yet.</div>}
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} pollId={poll.id} />
      ))}
    </div>
  );
}

export default HomePage;
