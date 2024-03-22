"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import { HeartIcon } from "../Icons";
import { createLike, deleteLike } from "@/db/queries/likes";
import { useSession } from "next-auth/react";

interface LikeButtonProps {
  ticker: string;
  isLiked: boolean;
}

export function LikeButton({ ticker, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const { data: session } = useSession();
  const userId = session?.user.id;

  async function toggleLike() {
    setLiked(!liked);
    if (session && session.user) {
      if (liked) deleteLike(userId, ticker);
      else createLike(userId, ticker);
    }
    console.log(ticker + " Checkbox clicked");
  }

  return (
    <Checkbox
      icon={<HeartIcon />}
      color="danger"
      size="lg"
      radius="full"
      isSelected={liked}
      onValueChange={() => toggleLike()}
    />
  );
}
