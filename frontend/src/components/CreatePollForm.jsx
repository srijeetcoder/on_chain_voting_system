import React, { useState } from "react";
import { createPoll } from "../utils/soroban.js";

export function CreatePollForm({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createPoll(question, options.filter((o) => o.trim() !== ""));
    setLoading(false);
    setQuestion("");
    setOptions(["", ""]);
    if (onPollCreated) onPollCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <label className="block mb-2 font-semibold">Question</label>
      <input
        className="w-full border p-2 mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <label className="block mb-2 font-semibold">Options</label>
      {options.map((opt, idx) => (
        <input
          key={idx}
          className="w-full border p-2 mb-2"
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
          required
        />
      ))}
      <button
        type="button"
        className="mb-4 px-2 py-1 bg-gray-200 rounded"
        onClick={addOption}
      >
        Add Option
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Poll"}
      </button>
    </form>
  );
}
