import React from "react";
import { CreatePollForm } from "../components/CreatePollForm";

function CreatePollPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Poll</h2>
      <CreatePollForm />
    </div>
  );
}

export default CreatePollPage;
