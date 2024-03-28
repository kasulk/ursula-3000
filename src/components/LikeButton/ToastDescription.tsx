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
    <div className="flex items-center">
      <span>
        You&apos;ve just {isLiked ? "liked" : "unliked"}{" "}
        <strong>{ticker}</strong>
        {isLiked ? "!" : "..."}&nbsp;
      </span>
      <HeartIcon
        filled
        fill={isLiked ? "crimson" : "gray"}
        className={isLiked ? "" : "opacity-50"}
      />
    </div>
  );
}
