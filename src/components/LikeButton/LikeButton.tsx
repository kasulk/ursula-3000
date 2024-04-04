"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useLikedStocksStore } from "@/store/likedStocks";
import { Checkbox } from "@nextui-org/checkbox";
import { HeartIcon } from "../Icons";
import { toast } from "../ui/Toast/use-toast";
import delayedToast from "../ui/Toast/delayedToast";
import LikeToastDescription from "./LikeToastDescription";

interface LikeButtonProps {
  ticker: string;
  isLiked: boolean;
}

export function LikeButton({ ticker, isLiked: isLikedProp }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const addLikedStock = useLikedStocksStore((state) => state.addLikedStock);
  const removeLikedStock = useLikedStocksStore(
    (state) => state.removeLikedStock,
  );

  function toggleLike() {
    setIsLiked(!isLiked);
    if (isLiked) {
      if (session && session.user) {
        actions.deleteLike(userId, ticker);
      }
      removeLikedStock(ticker);
      toast({
        className: "bg-opacity-50 border-danger border-1",
        title: "Oh no...",
        description: (
          <LikeToastDescription ticker={ticker} isLiked={!isLiked} />
        ),
      });
    } else {
      if (session && session.user) {
        actions.createLike(userId, ticker);
      }
      addLikedStock(ticker);
      toast({
        className: "bg-opacity-50 border-success border-1",
        title: "Sweet!",
        description: (
          <LikeToastDescription ticker={ticker} isLiked={!isLiked} />
        ),
      });

      if (!session || !session.user) {
        delayedToast(2000, {
          className: "bg-opacity-50 border-warning border-1",
          title: "Remember 🤓",
          description: "Likes only persist if you're logged in!",
        });
      }
    }
  }

  return (
    <Checkbox
      icon={<HeartIcon />}
      color="danger"
      size="lg"
      radius="full"
      isSelected={isLiked}
      onValueChange={toggleLike}
    />
  );
}
