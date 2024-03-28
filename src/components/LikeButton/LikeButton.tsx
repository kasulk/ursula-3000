"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";
import { HeartIcon } from "../Icons";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { useLikedStocksStore } from "@/store/likedStocks";
import { useToast } from "../ui/use-toast";

interface LikeButtonProps {
  ticker: string;
  isLiked: boolean;
}

function toastDescriptionLike(ticker: string) {
  return (
    <div className="flex items-center">
      <span>
        You&apos;ve just liked <strong>{ticker}</strong>!&nbsp;
      </span>
      <HeartIcon filled fill="crimson" />
    </div>
  );
}
function toastDescriptionUnlike(ticker: string) {
  return (
    <div className="flex items-center">
      <span>
        You&apos;ve just unliked <strong>{ticker}</strong>...&nbsp;
      </span>
      <HeartIcon filled fill="gray" className="opacity-50" />
    </div>
  );
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
      toast({ title: "Oh no...", description: toastDescriptionUnlike(ticker) });
    } else {
      if (session && session.user) {
        actions.createLike(userId, ticker);
      }
      addLikedStock(ticker);
      toast({ title: "Sweet!", description: toastDescriptionLike(ticker) });
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
