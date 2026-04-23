import React from "react";
import { Link } from "react-router-dom";

export function PollCard({ poll, pollId }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">{poll.question}</h2>
      <Link
        to={`/vote/${pollId}`}
        className="text-blue-600 hover:underline"
      >
        Vote / View Results
      </Link>
    </div>
  );
}
