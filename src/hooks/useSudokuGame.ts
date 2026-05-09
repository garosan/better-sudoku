import { useState, useEffect, useCallback, useRef } from "react";
import {
  Board,
  Cell,
  Difficulty,
  generatePuzzleAndSolution,
  isBoardComplete,
} from "@/lib/sudoku";

type GameStatus = "idle" | "playing" | "complete";

type SudokuGameState = {
  board: Board;
  selectedCell: [number, number] | null;
  selectedNumber: number | null;
  difficulty: Difficulty;
  status: GameStatus;
  seconds: number;
  errors: number;
};

type SudokuGameActions = {
  selectCell: (row: number, col: number) => void;
  enterNumber: (num: number) => void;
  eraseCell: () => void;
  newGame: (difficulty: Difficulty) => void;
};

export function useSudokuGame(): SudokuGameState & SudokuGameActions {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [board, setBoard] = useState<Board>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null,
  );
  const [status, setStatus] = useState<GameStatus>("playing");
  const [seconds, setSeconds] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (status === "playing") {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  useEffect(() => {
    newGame("easy");
  }, []);

  const highlightCells = useCallback(
    (newBoard: Board, row: number, col: number): Board => {
      return newBoard.map((r, ri) =>
        r.map((cell, ci) => ({
          ...cell,
          isSelected: ri === row && ci === col,
          isHighlighted:
            (ri === row ||
              ci === col ||
              (Math.floor(ri / 3) === Math.floor(row / 3) &&
                Math.floor(ci / 3) === Math.floor(col / 3))) &&
            !(ri === row && ci === col),
        })),
      );
    },
    [],
  );

  const selectCell = useCallback(
    (row: number, col: number) => {
      setSelectedCell([row, col]);
      setSelectedNumber(board[row][col].value);
      setBoard((prev) => highlightCells(prev, row, col));
    },
    [highlightCells, board],
  );

  const enterNumber = useCallback(
    (num: number) => {
      if (!selectedCell) return;
      const [row, col] = selectedCell;

      setBoard((prev) => {
        if (prev[row][col].isGiven) return prev;

        const isCorrect = solution[row][col] === num;

        const newBoard = prev.map((r, ri) =>
          r.map((cell, ci) => {
            if (ri === row && ci === col) {
              return { ...cell, value: num, isError: !isCorrect };
            }
            return cell;
          }),
        );

        if (!isCorrect) {
          setErrors((e) => e + 1);
        }

        const highlighted = highlightCells(newBoard, row, col);

        if (isBoardComplete(highlighted)) {
          setStatus("complete");
        }

        return highlighted;
      });
    },
    [selectedCell, solution, highlightCells],
  );

  const eraseCell = useCallback(() => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;

    setBoard((prev) => {
      if (prev[row][col].isGiven) return prev;

      const newBoard = prev.map((r, ri) =>
        r.map((cell, ci) => {
          if (ri === row && ci === col) {
            return { ...cell, value: null, isError: false };
          }
          return cell;
        }),
      );

      return highlightCells(newBoard, row, col);
    });
  }, [selectedCell, highlightCells]);

  const newGame = useCallback((diff: Difficulty) => {
    const { board, solution } = generatePuzzleAndSolution(diff);
    setDifficulty(diff);
    setBoard(board);
    setSolution(solution);
    setSelectedCell(null);
    setSeconds(0);
    setErrors(0);
    setStatus("playing");
  }, []);

  return {
    board,
    selectedCell,
    selectedNumber,
    difficulty,
    status,
    seconds,
    errors,
    selectCell,
    enterNumber,
    eraseCell,
    newGame,
  };
}
