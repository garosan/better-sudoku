import { Button } from "@/components/ui/button";
import { Eraser, RefreshCw } from "lucide-react";
import { Board } from "@/lib/sudoku";
import { cn } from "@/lib/utils";

type SudokuControlsProps = {
  board: Board;
  onNumber: (num: number) => void;
  onErase: () => void;
  onNewGame: () => void;
};

export function SudokuControls({
  board,
  onNumber,
  onErase,
  onNewGame,
}: SudokuControlsProps) {
  const countMap = Array.from({ length: 10 }, (_, i) => {
    if (i === 0) return 0;
    return board.flat().filter((cell) => cell.value === i && !cell.isError)
      .length;
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <Button
        variant="outline"
        className="w-full gap-2 rounded-lg"
        onClick={onErase}
      >
        <Eraser className="w-4 h-4" />
        Erase
      </Button>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
          const completed = countMap[num] >= 9;
          return (
            <button
              key={num}
              onClick={() => !completed && onNumber(num)}
              disabled={completed}
              className={cn(
                "w-full h-14 rounded-lg text-xl font-semibold border border-border transition-colors",
                "flex items-center justify-center",
                completed
                  ? "opacity-30 cursor-not-allowed bg-muted text-muted-foreground"
                  : "bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {num}
            </button>
          );
        })}
      </div>

      <Button className="w-full gap-2 rounded-lg" onClick={onNewGame}>
        <RefreshCw className="w-4 h-4" />
        New Game
      </Button>
    </div>
  );
}
