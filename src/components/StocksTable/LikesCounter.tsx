interface LikesCounterProps {
  numLikes?: number;
}

export default function LikesCounter({ numLikes = 0 }: LikesCounterProps) {
  return (
    <span className="absolute -top-1 left-10 z-10 flex items-center justify-center rounded-full bg-danger px-2 py-1 text-foreground">
      {numLikes}
    </span>
  );
}
