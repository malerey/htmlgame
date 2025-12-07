import { useState, useCallback } from 'react';
import { GameState, Answer, Level } from '@/types/game';
import { QuestionPanel } from './QuestionPanel';
import { DesignPreview } from './DesignPreview';
import { EndScreen } from './EndScreen';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface GameScreenProps {
  level: Level;
  onHome: () => void;
}

export function GameScreen({ level, onHome }: GameScreenProps) {
  const questions = level.questions;

  const [gameState, setGameState] = useState<GameState>({
    currentLevelId: level.id,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    showExplanation: false,
    selectedAnswer: null,
    isAnswered: false,
  });

  const currentQuestion = questions[gameState.currentQuestionIndex];

  const handleSelectAnswer = useCallback((answerId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerId,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!gameState.selectedAnswer) return;

    const isCorrect = gameState.selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedChoice: gameState.selectedAnswer,
      isCorrect,
    };

    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, newAnswer],
    }));
  }, [gameState.selectedAnswer, currentQuestion]);

  const handleShowExplanation = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showExplanation: true,
    }));
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setGameState(prev => ({
        ...prev,
        isComplete: true,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswered: false,
        showExplanation: false,
      }));
    }
  }, [gameState.currentQuestionIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setGameState({
      currentLevelId: level.id,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isComplete: false,
      showExplanation: false,
      selectedAnswer: null,
      isAnswered: false,
    });
  }, [level.id]);

  if (gameState.isComplete) {
    return (
      <EndScreen
        level={level}
        score={gameState.score}
        totalQuestions={questions.length}
        answers={gameState.answers}
        questions={questions}
        onRestart={handleRestart}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 px-4 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onHome}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <div className="h-6 w-px bg-border" />
          <span className="text-sm font-medium text-foreground">
            {level.title}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            level.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
            level.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
            'bg-rose-500/20 text-rose-400'
          }`}>
            {level.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Score: <span className="font-bold text-primary">{gameState.score}</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Design Preview - Top on mobile/tablet, Right on desktop */}
        <div className="w-full lg:w-1/2 p-2 lg:p-4 overflow-hidden">
          <DesignPreview
            level={level}
            highlightedElement={currentQuestion.highlightElement}
          />
        </div>

        {/* Question Panel - Bottom on mobile/tablet, Left on desktop */}
        <div className="w-full lg:w-1/2 p-2 lg:p-4 overflow-hidden">
          <QuestionPanel
            question={currentQuestion}
            questionNumber={gameState.currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={gameState.selectedAnswer}
            isAnswered={gameState.isAnswered}
            showExplanation={gameState.showExplanation}
            onSelectAnswer={handleSelectAnswer}
            onSubmit={handleSubmit}
            onShowExplanation={handleShowExplanation}
            onNext={handleNext}
            score={gameState.score}
          />
        </div>
      </main>
    </div>
  );
}
