import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

type SudokuControlsProps = {
  onNumber: (num: number) => void;
  onErase: () => void;
};

export function SudokuControls({ onNumber, onErase }: SudokuControlsProps) {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3 2xl:max-w-lg">
      <div className="grid grid-cols-9 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="aspect-square p-0 text-base font-medium"
            onClick={() => onNumber(num)}
          >
            {num}
          </Button>
        ))}
      </div>
      <Button variant="outline" className="w-full gap-2" onClick={onErase}>
        <Eraser className="w-4 h-4" />
        Erase
      </Button>
    </div>
  );
}
