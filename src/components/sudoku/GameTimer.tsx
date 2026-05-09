type GameTimerProps = {
  seconds: number;
};

export function GameTimer({ seconds }: GameTimerProps) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <span className="text-muted-foreground font-mono text-sm tabular-nums">
      {mins}:{secs}
    </span>
  );
}
