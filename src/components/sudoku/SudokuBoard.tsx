import { Board } from "@/lib/sudoku";
import { SudokuCell } from "./SudokuCell";

type SudokuBoardProps = {
  board: Board;
  selectedNumber: number | null;
  onCellClick: (row: number, col: number) => void;
};

export function SudokuBoard({
  board,
  selectedNumber,
  onCellClick,
}: SudokuBoardProps) {
  return (
    <div className="grid grid-cols-9 border-2 border-foreground/30 rounded-sm w-full max-w-sm mx-auto 2xl:max-w-md">
      {board.map((row, ri) =>
        row.map((cell, ci) => (
          <SudokuCell
            key={`${ri}-${ci}`}
            cell={cell}
            row={ri}
            col={ci}
            isMatchingNumber={
              selectedNumber !== null && cell.value === selectedNumber
            }
            onClick={onCellClick}
          />
        )),
      )}
    </div>
  );
}
