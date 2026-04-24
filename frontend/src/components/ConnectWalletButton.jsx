import React, { useState } from "react";
import { connectFreighter } from "../utils/soroban.js";

export function ConnectWalletButton() {
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    setError(null);
    try {
      const pk = await connectFreighter();
      if (pk) {
        setPublicKey(pk);
      }
    } catch (err) {
      setError(`Connection failed: ${err.message || "Unknown error"}`);
      console.error(err);
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 text-sm font-semibold text-white bg-accent rounded-lg shadow-glow shadow-inner-highlight transition-all duration-200 hover:bg-accent-bright hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
        onClick={handleConnect}
      >
        {publicKey ? `Connected: ${publicKey.slice(0, 6)}...` : "Connect Wallet"}
      </button>
      {error && (
        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded shadow-lg whitespace-nowrap animate-in slide-in-from-top-2">
          {error}
        </div>
      )}
    </div>
  );
}
