import React from "react";
import { CreatePollForm } from "../components/CreatePollForm";

function CreatePollPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="page-title">Create Poll</h2>
      <p className="page-subtitle">Set up a new transparent poll on the Stellar network.</p>
      <CreatePollForm />
    </div>
  );
}

export default CreatePollPage;
