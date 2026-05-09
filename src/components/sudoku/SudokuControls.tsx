import { Button } from "@/components/ui/button";
import { Eraser, RefreshCw } from "lucide-react";
import { Difficulty } from "@/lib/sudoku";

type SudokuControlsProps = {
  onNumber: (num: number) => void;
  onErase: () => void;
  onNewGame: () => void;
};

export function SudokuControls({
  onNumber,
  onErase,
  onNewGame,
}: SudokuControlsProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      <Button variant="outline" className="w-full gap-2" onClick={onErase}>
        <Eraser className="w-4 h-4" />
        Erase
      </Button>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-12 text-xl font-semibold"
            onClick={() => onNumber(num)}
          >
            {num}
          </Button>
        ))}
      </div>

      <Button className="w-full gap-2" onClick={onNewGame}>
        <RefreshCw className="w-4 h-4" />
        New Game
      </Button>
    </div>
  );
}
