"use client";

import { useEffect } from "react";
import { useSudokuGame } from "@/hooks/useSudokuGame";
import { SudokuBoard } from "@/components/sudoku/SudokuBoard";
import { SudokuControls } from "@/components/sudoku/SudokuControls";
import { GameTimer } from "@/components/sudoku/GameTimer";
import { DifficultySelector } from "@/components/sudoku/DifficultySelector";

export default function Home() {
  const {
    board,
    difficulty,
    status,
    seconds,
    errors,
    selectedNumber,
    selectCell,
    enterNumber,
    eraseCell,
    newGame,
  } = useSudokuGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "9") {
        enterNumber(parseInt(e.key));
      }
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        eraseCell();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enterNumber, eraseCell]);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4 py-8 gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Better Sudoku</h1>

      <DifficultySelector current={difficulty} onSelect={newGame} />

      <div className="flex items-center justify-between w-full max-w-sm 2xl:max-w-lg">
        <span className="text-sm text-muted-foreground">
          Errors: <span className="text-foreground font-medium">{errors}</span>
        </span>
        <GameTimer seconds={seconds} />
      </div>

      <SudokuBoard
        board={board}
        selectedNumber={selectedNumber}
        onCellClick={selectCell}
      />

      <SudokuControls onNumber={enterNumber} onErase={eraseCell} />

      {status === "complete" && (
        <div className="text-center flex flex-col gap-2">
          <p className="text-lg font-semibold">Puzzle complete 🎉</p>
          <p className="text-sm text-muted-foreground">
            Finished in {Math.floor(seconds / 60)}m {seconds % 60}s with{" "}
            {errors} errors
          </p>
        </div>
      )}
    </main>
  );
}
