import { Level } from '@/types/game';
import { easyLevel } from './easy';
import { mediumLevel } from './medium';
import { hardLevel } from './hard';

// Register all levels here - just import and add to this array
export const levels: Level[] = [
  easyLevel,
  mediumLevel,
  hardLevel,
];

export function getLevelById(id: string): Level | undefined {
  return levels.find(level => level.id === id);
}
