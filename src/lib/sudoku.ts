import { getSudoku } from "sudoku-gen";

export type Difficulty = "easy" | "medium" | "hard";

export type Cell = {
  value: number | null;
  isGiven: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
};

export type Board = Cell[][];

export function generatePuzzleAndSolution(difficulty: Difficulty): {
  board: Board;
  solution: number[][];
} {
  const { puzzle, solution } = getSudoku(difficulty);

  const board: Board = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => {
      const char = puzzle[row * 9 + col];
      const value = char === "-" ? null : parseInt(char);
      return {
        value,
        isGiven: value !== null,
        isSelected: false,
        isHighlighted: false,
        isError: false,
      };
    }),
  );

  const solutionGrid = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => parseInt(solution[row * 9 + col])),
  );

  return { board, solution: solutionGrid };
}

export function isBoardComplete(board: Board): boolean {
  return board.every((row) =>
    row.every((cell) => cell.value !== null && !cell.isError),
  );
}
