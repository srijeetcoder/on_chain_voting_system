import React, { useState } from "react";
import { createPoll } from "../utils/soroban.js";

export function CreatePollForm({ onPollCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    try {
      await createPoll(question, options.filter((o) => o.trim() !== ""));
      setQuestion("");
      setOptions(["", ""]);
      if (onPollCreated) onPollCreated();
    } catch (err) {
      console.error(err);
      setError(`Failed to create poll: ${err.message || err.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel">
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label className="form-label">Question</label>
        <input
          className="form-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          placeholder="e.g. What is the best programming language?"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Options</label>
        {options.map((opt, idx) => (
          <input
            key={idx}
            className="form-input"
            style={{ marginBottom: "0.5rem" }}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
            placeholder={`Option ${idx + 1}`}
          />
        ))}
      </div>
      
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={addOption}
        >
          + Add Option
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating..." : "Submit Poll"}
        </button>
      </div>
    </form>
  );
}
