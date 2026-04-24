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
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] shadow-card">
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded text-sm animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
      
      <div className="mb-8 space-y-2">
        <label className="block text-sm font-medium text-foreground-muted tracking-wide">
          QUESTION
        </label>
        <input
          className="w-full px-4 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-200"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          placeholder="e.g. What is the best programming language?"
        />
      </div>
      
      <div className="mb-10 space-y-3">
        <label className="block text-sm font-medium text-foreground-muted tracking-wide">
          OPTIONS
        </label>
        <div className="space-y-3">
          {options.map((opt, idx) => (
            <input
              key={idx}
              className="w-full px-4 py-3 bg-[#0F0F12] border border-white/10 rounded-lg text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-200"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              required
              placeholder={`Option ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-white/[0.06]">
        <button
          type="button"
          className="flex-1 px-4 py-3 text-sm font-medium text-foreground bg-white/[0.05] border border-transparent rounded-lg transition-colors duration-200 hover:bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
          onClick={addOption}
        >
          + Add Option
        </button>
        <button
          type="submit"
          className="flex-[2] px-4 py-3 text-sm font-semibold text-white bg-accent rounded-lg shadow-glow shadow-inner-highlight transition-all duration-200 hover:bg-accent-bright hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          disabled={loading}
        >
          {loading ? "Creating..." : "Submit Poll"}
        </button>
      </div>
    </form>
  );
}
