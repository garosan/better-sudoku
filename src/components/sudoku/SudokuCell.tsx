import { cn } from "@/lib/utils";
import { Cell } from "@/lib/sudoku";

type SudokuCellProps = {
  cell: Cell;
  row: number;
  col: number;
  isMatchingNumber: boolean;
  onClick: (row: number, col: number) => void;
};

export function SudokuCell({
  cell,
  row,
  col,
  isMatchingNumber,
  onClick,
}: SudokuCellProps) {
  return (
    <button
      onClick={() => onClick(row, col)}
      className={cn(
        "w-full aspect-square flex items-center justify-center",
        "text-lg font-medium border border-border transition-colors",
        "focus:outline-none",
        col % 3 === 0 && col !== 0 && "border-l-2 border-l-foreground/60",
        row % 3 === 0 && row !== 0 && "border-t-2 border-t-foreground/60",
        cell.isSelected && "bg-primary/30",
        !cell.isSelected && isMatchingNumber && "bg-primary/20",
        !cell.isSelected &&
          !isMatchingNumber &&
          cell.isHighlighted &&
          "bg-muted",
        !cell.isSelected &&
          !isMatchingNumber &&
          !cell.isHighlighted &&
          "bg-card",
        cell.isError && "text-destructive",
        !cell.isError && cell.isGiven && "text-foreground font-bold",
        !cell.isError && !cell.isGiven && "text-primary",
      )}
    >
      {cell.value ?? ""}
    </button>
  );
}
