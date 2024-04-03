import React from "react";
import { HeartIcon } from "../Icons";

interface ToastDescriptionProps {
  ticker: string;
  isLiked: boolean;
}

export default function ToastDescription({
  ticker,
  isLiked,
}: ToastDescriptionProps) {
  return (
    <div className="flex items-center gap-2">
      <span>
        You&apos;ve just {isLiked ? "liked" : "unliked"}{" "}
        <strong>{ticker}</strong>
        {isLiked ? "!" : "..."}
      </span>
      <HeartIcon
        filled={isLiked}
        className={`text-danger ${isLiked ? "" : "opacity-75"}`}
      />
    </div>
  );
}
