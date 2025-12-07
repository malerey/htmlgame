import { Question } from '@/types/game';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface QuestionPanelProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  showExplanation: boolean;
  onSelectAnswer: (answerId: string) => void;
  onSubmit: () => void;
  onShowExplanation: () => void;
  onNext: () => void;
  score: number;
}

export function QuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  showExplanation,
  onSelectAnswer,
  onSubmit,
  onShowExplanation,
  onNext,
  score,
}: QuestionPanelProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const explanationRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to explanation when it appears
  useEffect(() => {
    if (showExplanation && explanationRef.current && scrollContainerRef.current) {
      // Small delay to ensure the element is rendered and animation starts
      setTimeout(() => {
        const container = scrollContainerRef.current;
        const explanation = explanationRef.current;
        if (container && explanation) {
          const containerRect = container.getBoundingClientRect();
          const explanationRect = explanation.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          const explanationTop = explanationRect.top - containerRect.top + scrollTop;
          
          container.scrollTo({
            top: explanationTop - 20, // 20px offset for better visibility
            behavior: 'smooth',
          });
        }
      }, 150);
    }
  }, [showExplanation]);

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-3 lg:px-6 py-3 lg:py-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Score:</span>
            <span className="text-sm font-bold text-primary">{score}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-3 lg:p-6">
        <div className="animate-fade-in">
          {/* Highlighted Element Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              Inspecting: {question.highlightElement}
            </span>
          </div>

          {/* Question Title */}
          <h2 className="text-xl font-bold text-foreground mb-2">
            {question.title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {question.description}
          </p>

          {/* Code Snippet */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Code Snippet
              </span>
            </div>
            <pre className="code-block">
              <code>
                {question.codeSnippet.split('\n').map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-muted-foreground w-8 text-right mr-4">
                      {i + 1}
                    </span>
                    <span>{highlightCode(line)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Answer Choices */}
          <div className="space-y-3">
            {question.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.id;
              const isCorrectChoice = choice.id === question.correctAnswer;
              
              let variant: 'choice' | 'choiceSelected' | 'choiceCorrect' | 'choiceWrong' = 'choice';
              
              if (isAnswered) {
                if (isCorrectChoice) {
                  variant = 'choiceCorrect';
                } else if (isSelected && !isCorrectChoice) {
                  variant = 'choiceWrong';
                }
              } else if (isSelected) {
                variant = 'choiceSelected';
              }

              return (
                <Button
                  key={choice.id}
                  variant={variant}
                  size="lg"
                  className="w-full h-auto py-4 px-4 whitespace-normal"
                  onClick={() => !isAnswered && onSelectAnswer(choice.id)}
                  disabled={isAnswered}
                >
                  <div className="flex items-start gap-3 w-full">
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                      isAnswered && isCorrectChoice ? "bg-success text-success-foreground" :
                      isAnswered && isSelected && !isCorrectChoice ? "bg-destructive text-destructive-foreground" :
                      isSelected ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {isAnswered && isCorrectChoice ? <Check className="w-4 h-4" /> :
                       isAnswered && isSelected && !isCorrectChoice ? <X className="w-4 h-4" /> :
                       choice.label}
                    </span>
                    <code className="font-mono text-sm text-left flex-1 break-words whitespace-normal">
                      {choice.code}
                    </code>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && showExplanation && (
            <div ref={explanationRef} className="mt-6 p-4 rounded-xl bg-muted border border-border animate-slide-up">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-warning" />
                <span className="font-semibold text-foreground">Explanation</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-border bg-muted/50">
        {!isAnswered ? (
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            disabled={!selectedAnswer}
            onClick={onSubmit}
          >
            Submit Answer
          </Button>
        ) : (
          <div className="flex gap-3">
            {!showExplanation && (
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onShowExplanation}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Explain
              </Button>
            )}
            <Button
              variant="hero"
              size="lg"
              className={showExplanation ? "w-full" : "flex-1"}
              onClick={onNext}
            >
              {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function highlightCode(line: string): React.ReactNode {
  // Simple syntax highlighting
  const parts = line.split(/(\???|<\/?[a-z]+|[a-z-]+:|".+?"|'.+?'|\/\*.*\*\/|\/\/.*)/gi);
  
  return parts.map((part, i) => {
    if (part === '???') {
      return <span key={i} className="bg-primary/30 text-primary px-1 rounded">{part}</span>;
    }
    if (part.startsWith('<') || part.startsWith('</')) {
      return <span key={i} className="text-primary">{part}</span>;
    }
    if (part.endsWith(':')) {
      return <span key={i} className="text-accent">{part}</span>;
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return <span key={i} className="text-success">{part}</span>;
    }
    if (part.startsWith('/*') || part.startsWith('//')) {
      return <span key={i} className="text-muted-foreground italic">{part}</span>;
    }
    return part;
  });
}
