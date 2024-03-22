"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import { HeartIcon } from "../Icons";

interface LikeButtonProps {
  ticker: string;
  isLiked: boolean;
}

export function LikeButton({ ticker, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);

  async function toggleLike() {}

  return (
    <Checkbox
      icon={<HeartIcon />}
      color="danger"
      size="lg"
      radius="full"
      isSelected={isLiked}
      // onValueChange={setLiked()}
    />
  );
}
