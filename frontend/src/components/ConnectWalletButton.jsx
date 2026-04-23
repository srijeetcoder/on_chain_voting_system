import React, { useState } from "react";
import { connectFreighter } from "../utils/soroban.js";

export function ConnectWalletButton() {
  const [publicKey, setPublicKey] = useState("");

  const handleConnect = async () => {
    const pk = await connectFreighter();
    setPublicKey(pk);
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={handleConnect}
    >
      {publicKey ? `Connected: ${publicKey.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}
