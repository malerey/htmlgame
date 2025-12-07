import { levels } from "@/levels";
import { Button } from "@/components/ui/button";
import { Code2, Layout, LayoutDashboard, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Difficulty } from "@/types/game";

interface StartScreenProps {
  onSelectLevel: (levelId: string) => void;
}

const difficultyIcons: Record<Difficulty, LucideIcon> = {
  easy: Layout,
  medium: Code2,
  hard: LayoutDashboard,
};

const difficultyColors: Record<Difficulty, string> = {
  easy: "from-emerald-500 to-teal-500",
  medium: "from-amber-500 to-orange-500",
  hard: "from-rose-500 to-pink-500",
};

export function StartScreen({ onSelectLevel }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Learn by Inspection
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-gradient-primary">HTML & CSS</span>
          <br />
          <span className="text-foreground">Builder Game</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Inspect designs like in Figma, answer questions, and watch your code
          come to life. No typing required—just visual thinking!
        </p>
        <p className="mt-12 text-sm text-muted-foreground text-center">
          Hover over design elements to inspect them • Answer questions to build
          the layout
        </p>
      </div>

      {/* Level Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {levels.map((level, index) => {
          const Icon = difficultyIcons[level.difficulty] || Code2;
          const gradient =
            difficultyColors[level.difficulty] || "from-gray-500 to-gray-600";

          return (
            <div
              key={level.id}
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              />

              <div className="relative bg-card border border-border rounded-2xl p-6 h-full flex flex-col hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                {/* Thumbnail Preview */}
                <div
                  className={`w-full aspect-video rounded-xl mb-6 bg-gradient-to-br ${gradient} p-4 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                  <Icon className="w-16 h-16 text-foreground relative z-10" />

                  {/* Mini preview elements */}
                  <div className="absolute inset-4 border border-foreground/20 rounded-lg">
                    <div className="absolute top-2 left-2 right-2 h-2 bg-foreground/20 rounded" />
                    <div className="absolute top-6 left-2 w-8 h-12 bg-foreground/10 rounded" />
                    <div className="absolute top-6 left-12 right-2 bottom-2 bg-foreground/10 rounded" />
                  </div>
                </div>

                {/* Level Info */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                  >
                    {level.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {level.questions.length} questions
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {level.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {level.description}
                </p>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => onSelectLevel(level.id)}
                >
                  Start Challenge
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-sm text-muted-foreground text-center">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/malerey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Ma Rey
        </a>
      </p>
    </div>
  );
}
