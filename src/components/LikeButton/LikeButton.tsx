"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useLikedStocksStore } from "@/store/likedStocks";
import { Checkbox } from "@nextui-org/checkbox";
import { HeartIcon } from "../Icons";
import { useToast } from "../ui/use-toast";
import ToastDescription from "./ToastDescription";

interface LikeButtonProps {
  ticker: string;
  isLiked: boolean;
}

export function LikeButton({ ticker, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const addLikedStock = useLikedStocksStore((state) => state.addLikedStock);
  const removeLikedStock = useLikedStocksStore(
    (state) => state.removeLikedStock,
  );

  const { toast } = useToast();

  async function toggleLike() {
    setLiked(!liked);
    if (liked) {
      if (session && session.user) {
        actions.deleteLike(userId, ticker);
      }
      removeLikedStock(ticker);
      toast({
        title: "Oh no...",
        description: <ToastDescription ticker={ticker} isLiked={!liked} />,
      });
    } else {
      if (session && session.user) {
        actions.createLike(userId, ticker);
      }
      addLikedStock(ticker);
      toast({
        title: "Sweet!",
        description: <ToastDescription ticker={ticker} isLiked={!liked} />,
      });
    }
  }

  return (
    <Checkbox
      icon={<HeartIcon />}
      color="danger"
      size="lg"
      radius="full"
      isSelected={liked}
      onValueChange={toggleLike}
    />
  );
}
