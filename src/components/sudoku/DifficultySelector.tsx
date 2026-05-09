import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/lib/sudoku";

type DifficultySelectorProps = {
  current: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
};

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export function DifficultySelector({
  current,
  onSelect,
}: DifficultySelectorProps) {
  return (
    <div className="flex gap-2">
      {difficulties.map((diff) => (
        <Button
          key={diff}
          variant="outline"
          size="sm"
          className={cn(
            "capitalize",
            current === diff &&
              "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80",
          )}
          onClick={() => onSelect(diff)}
        >
          {diff}
        </Button>
      ))}
    </div>
  );
}
