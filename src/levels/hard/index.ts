import { Level, Question } from '@/types/game';
import { HardDesign } from './Design';

const questions: Question[] = [
  {
    id: 'hard-1',
    title: 'Sidebar Fixed Position',
    description: 'The sidebar stays fixed while the main content scrolls. What positioning achieves this?',
    highlightElement: 'sidebar',
    codeSnippet: `.sidebar {
  ???;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'position: fixed' },
      { id: 'b', label: 'B', code: 'position: absolute' },
      { id: 'c', label: 'C', code: 'position: sticky' },
    ],
    correctAnswer: 'a',
    explanation: 'position: fixed removes the element from the normal document flow and positions it relative to the viewport (browser window). It stays in place during scrolling, making it perfect for sidebars and navigation bars. position: absolute positions relative to a positioned ancestor, and position: sticky only sticks when scrolling reaches a threshold.',
  },
  {
    id: 'hard-2',
    title: 'Dashboard Grid Layout',
    description: 'The dashboard content area uses a responsive grid. Which CSS creates a grid that adapts to available space?',
    highlightElement: 'dashboard-content',
    codeSnippet: `.dashboard-grid {
  display: grid;
  grid-template-columns: ???;
  gap: 20px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'repeat(3, 1fr)' },
      { id: 'b', label: 'B', code: 'repeat(auto-fit, minmax(280px, 1fr))' },
      { id: 'c', label: 'C', code: 'auto auto auto' },
    ],
    correctAnswer: 'b',
    explanation: 'repeat(auto-fit, minmax(280px, 1fr)) creates a responsive grid that automatically adjusts to the container width. Each column is at least 280px wide (minmax minimum), and if there\'s extra space, columns grow equally (1fr). When space is too narrow, columns wrap to new rows. repeat(3, 1fr) creates exactly 3 fixed columns, and "auto auto auto" is invalid syntax.',
  },
  {
    id: 'hard-3',
    title: 'Top Navigation Alignment',
    description: 'The top nav has the logo on the left and user menu on the right. What flexbox property achieves this split?',
    highlightElement: 'top-nav',
    codeSnippet: `.top-nav {
  display: flex;
  align-items: center;
  ???;
  padding: 0 24px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'justify-content: space-between' },
      { id: 'b', label: 'B', code: 'flex-direction: row' },
      { id: 'c', label: 'C', code: 'gap: auto' },
    ],
    correctAnswer: 'a',
    explanation: 'justify-content: space-between distributes flex items with maximum space between them, pushing the first item to the container start and the last item to the container end. This is the standard pattern for navigation bars with logo on left and menu on right. flex-direction: row is the default and doesn\'t create the split, and gap: auto is invalid.',
  },
  {
    id: 'hard-4',
    title: 'Main Content Flex Layout',
    description: 'The main content area fills the remaining space next to the sidebar in a flex container. What CSS property makes it take up all available space?',
    highlightElement: 'main-content',
    codeSnippet: `.main-content {
  display: flex;
  flex-direction: column;
  ???;
  padding: 24px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'flex: 1' },
      { id: 'b', label: 'B', code: 'width: 100%' },
      { id: 'c', label: 'C', code: 'flex-grow: 0' },
    ],
    correctAnswer: 'a',
    explanation: 'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0. It makes the element grow to fill all available space in the flex container, automatically taking up the remaining width after the sidebar. width: 100% would try to be 100% of the parent, causing overflow, and flex-grow: 0 prevents growth.',
  },
  {
    id: 'hard-5',
    title: 'Card Nested Flexbox',
    description: 'Each dashboard card has a header with title on left and icon on right, using nested flexbox. Complete the CSS:',
    highlightElement: 'card-header',
    codeSnippet: `.card-header {
  display: flex;
  ???;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'justify-content: space-between; align-items: center' },
      { id: 'b', label: 'B', code: 'flex-wrap: nowrap; gap: 100%' },
      { id: 'c', label: 'C', code: 'align-content: space-between' },
    ],
    correctAnswer: 'a',
    explanation: 'justify-content: space-between pushes items to opposite ends horizontally (title left, icon right), while align-items: center vertically centers them within the flex container. This combination is the standard pattern for card headers, navigation bars, and any layout needing items on opposite sides. flex-wrap: nowrap is the default, and align-content only works with wrapped flex lines.',
  },
];

export const hardLevel: Level = {
  id: 'hard',
  title: 'Dashboard',
  description: 'Build a responsive dashboard with sidebar, navigation, and grid layout.',
  difficulty: 'hard',
  questions,
  designElements: [
    { id: 'sidebar', name: 'Sidebar', styles: { position: 'fixed', width: '250px', height: '100vh', backgroundColor: '#0f0f23', padding: '24px', top: '0', left: '0' } },
    { id: 'top-nav', name: 'Top Navigation', styles: { height: '64px', backgroundColor: '#1a1a2e', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
    { id: 'dashboard-content', name: 'Dashboard Grid', styles: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '24px' } },
    { id: 'main-content', name: 'Main Content', styles: { flex: '1', display: 'flex', flexDirection: 'column', padding: '24px' } },
    { id: 'card-header', name: 'Card Header', styles: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '8px' } },
  ],
  DesignComponent: HardDesign,
};
