import { useState } from 'react';
import { StartScreen } from '@/components/game/StartScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { getLevelById } from '@/levels';

const Index = () => {
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  const handleSelectLevel = (levelId: string) => {
    setSelectedLevelId(levelId);
  };

  const handleHome = () => {
    setSelectedLevelId(null);
  };

  if (selectedLevelId) {
    const level = getLevelById(selectedLevelId);
    if (level) {
      return <GameScreen level={level} onHome={handleHome} />;
    }
  }

  return <StartScreen onSelectLevel={handleSelectLevel} />;
};

export default Index;
