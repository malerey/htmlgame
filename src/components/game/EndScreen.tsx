import { Level, Answer, Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home, Check, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EndScreenProps {
  level: Level;
  score: number;
  totalQuestions: number;
  answers: Answer[];
  questions: Question[];
  onRestart: () => void;
  onHome: () => void;
}

export function EndScreen({
  level,
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
  onHome,
}: EndScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excellent!', color: 'text-success', emoji: '🏆' };
    if (percentage >= 70) return { label: 'Great Job!', color: 'text-primary', emoji: '⭐' };
    if (percentage >= 50) return { label: 'Good Try!', color: 'text-warning', emoji: '👍' };
    return { label: 'Keep Learning!', color: 'text-muted-foreground', emoji: '📚' };
  };

  const grade = getGrade();
  const incorrectAnswers = answers.filter(a => !a.isCorrect);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full animate-fade-in">
        {/* Score Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-6 animate-pulse-glow">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className={cn("text-4xl font-bold mb-2", grade.color)}>
            {grade.emoji} {grade.label}
          </h1>
          
          <p className="text-muted-foreground mb-6">
            You completed the {level.title} challenge
          </p>

          {/* Score Circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{score}</span>
              <span className="text-sm text-muted-foreground">of {totalQuestions}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-success mb-1">
                <Check className="w-5 h-5" />
                <span className="text-2xl font-bold">{score}</span>
              </div>
              <span className="text-sm text-muted-foreground">Correct</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-destructive mb-1">
                <X className="w-5 h-5" />
                <span className="text-2xl font-bold">{totalQuestions - score}</span>
              </div>
              <span className="text-sm text-muted-foreground">Incorrect</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="lg" onClick={onHome}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="hero" size="lg" onClick={onRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>

        {/* Mistakes Review */}
        {incorrectAnswers.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h2 className="text-lg font-semibold text-foreground">
                Review Your Mistakes
              </h2>
            </div>

            <div className="space-y-4">
              {incorrectAnswers.map((answer) => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) return null;

                const selectedChoice = question.choices.find(c => c.id === answer.selectedChoice);
                const correctChoice = question.choices.find(c => c.id === question.correctAnswer);

                return (
                  <div key={answer.questionId} className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">
                      {question.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive" />
                        <span className="text-muted-foreground">Your answer:</span>
                        <code className="font-mono text-destructive">{selectedChoice?.code}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">Correct:</span>
                        <code className="font-mono text-success">{correctChoice?.code}</code>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
