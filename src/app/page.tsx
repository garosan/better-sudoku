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
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-center py-4 border-b border-border">
        <h1 className="text-xl font-semibold tracking-tight">Better Sudoku</h1>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-6 gap-4">
        <DifficultySelector current={difficulty} onSelect={newGame} />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-3xl">
          <div className="flex flex-col gap-3 w-full lg:flex-1">
            <div className="flex items-center justify-between px-5">
              <span className="text-sm text-muted-foreground">
                Errors:{" "}
                <span className="text-foreground font-medium">{errors}</span>
              </span>
              <GameTimer seconds={seconds} />
            </div>
            <SudokuBoard
              board={board}
              selectedNumber={selectedNumber}
              onCellClick={selectCell}
            />
          </div>

          <div className="w-full lg:w-64 flex items-center">
            <SudokuControls
              onNumber={enterNumber}
              onErase={eraseCell}
              onNewGame={() => newGame(difficulty)}
            />
          </div>
        </div>

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
    </div>
  );
}
