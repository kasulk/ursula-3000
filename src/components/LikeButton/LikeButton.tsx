"use client";

import { useState } from "react";

interface LikeButtonProps {
  ticker: string;
  initialLiked: boolean;
}

function LikeButton({ ticker, initialLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    // Ändere den Like-Status in der DB
    // Annahme: Du hast eine API-Route zum Aktualisieren des Like-Status
    const response = await fetch(`/api/stocks/${ticker}/like`, {
      method: liked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Aktualisiere den Status in der UI
      setLiked(!liked);
    } else {
      console.error("Failed to update like status");
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={liked}
        onChange={toggleLike}
        style={{
          // Hier kannst du dein eigenes Like-Symbol-Design einfügen
          appearance: "none",
          width: "24px",
          height: "24px",
          backgroundImage: `url(${liked ? "liked-icon.svg" : "unliked-icon.svg"})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
      />
    </label>
  );
}

export default LikeButton;
