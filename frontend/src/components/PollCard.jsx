import React from "react";
import { Link } from "react-router-dom";

export function PollCard({ poll, pollId }) {
  return (
    <div className="spotlight-hover group flex flex-col justify-between h-full p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-8">
        {poll.question}
      </h3>
      <Link
        to={`/vote/${pollId}`}
        className="w-full text-center px-4 py-2.5 text-sm font-medium text-foreground bg-white/[0.05] border border-white/[0.06] rounded-lg transition-colors duration-200 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      >
        Vote / View Results
      </Link>
    </div>
  );
}
