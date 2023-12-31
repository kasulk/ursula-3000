import React from "react";
import IconHeart from "../IconHeart";

type Props = {
  _id: string;
  currentUser: string;
  Favorites?: string[];
  onToggleFavorite: (id: string, user: string) => void;
};

export default function FavoriteButton({
  _id,
  currentUser,
  Favorites,
  onToggleFavorite,
}: Props) {
  //
  const isFavorite = Favorites?.includes(currentUser);

  return (
    <IconHeart
      size={32}
      className={`absolute top-4 right-4 cursor-pointer transition active:fill-slate-100 active:stroke-slate-100 active:transition-none hover:scale-125  ${
        isFavorite
          ? `fill-rose-700 scale-110 hover:fill-slate-500`
          : `fill-transparent stroke-slate-100 stroke-2 scale-90 hover:fill-rose-700 hover:stroke-none`
      }`}
      onClick={() => onToggleFavorite(_id, currentUser)}
    />
  );
}
