import React from "react";
import { CreatePollForm } from "../components/CreatePollForm";

function CreatePollPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-gradient">
          Create Poll
        </h2>
        <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
          Set up a new transparent poll on the Stellar network.
        </p>
      </div>
      <CreatePollForm />
    </div>
  );
}

export default CreatePollPage;
