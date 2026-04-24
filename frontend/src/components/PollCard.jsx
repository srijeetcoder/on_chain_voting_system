import React from "react";
import { Link } from "react-router-dom";

export function PollCard({ poll, pollId }) {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <h2 className="page-subtitle" style={{ color: '#f8fafc', marginBottom: '1.5rem', fontWeight: 600 }}>{poll.question}</h2>
      <Link
        to={`/vote/${pollId}`}
        className="btn btn-secondary"
        style={{ textDecoration: 'none', textAlign: 'center', marginTop: 'auto' }}
      >
        Vote / View Results
      </Link>
    </div>
  );
}
