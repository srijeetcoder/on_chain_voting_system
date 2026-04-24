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
    <div style={{ position: "relative" }}>
      <button
        className="btn btn-primary"
        onClick={handleConnect}
      >
        {publicKey ? `Connected: ${publicKey.slice(0, 6)}...` : "Connect Wallet"}
      </button>
      {error && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "0.5rem", whiteSpace: "nowrap" }} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}
