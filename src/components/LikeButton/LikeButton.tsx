"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useLikedStocksStore } from "@/store/likedStocks";
import { Checkbox } from "@nextui-org/checkbox";
import { HeartIcon } from "../Icons";
import { toast } from "@/components/ui/use-toast";
import LikeToastDescription from "./ToastDescription";
import delayedToast from "@/utils/delayedToast";

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
        title: "Sweet!",
        description: (
          <LikeToastDescription ticker={ticker} isLiked={!isLiked} />
        ),
      });
      delayedToast(2000, {
        title: "Remember 🤓",
        description: "Likes only persist if you're logged in!",
      });
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
