import { Level, Question } from '@/types/game';
import { EasyDesign } from './Design';

const questions: Question[] = [
  {
    id: 'easy-1',
    title: 'Header Structure',
    description: 'Looking at the header section of this blog layout, which HTML structure best represents what you see?',
    highlightElement: 'header',
    codeSnippet: `<??? class="header">
  <h1>My Blog</h1>
  <nav>...</nav>
</???>`,
    choices: [
      { id: 'a', label: 'A', code: '<div class="header">' },
      { id: 'b', label: 'B', code: '<header class="header">' },
      { id: 'c', label: 'C', code: '<section class="header">' },
    ],
    correctAnswer: 'b',
    explanation: 'The <header> element is the semantic HTML5 tag specifically designed for page or section headers. It provides meaning to screen readers, improves SEO, and makes code more maintainable compared to a generic <div> which has no semantic meaning.',
  },
  {
    id: 'easy-2',
    title: 'Navigation Links',
    description: 'The navigation links are arranged horizontally in a row. What CSS property controls the direction of flex items?',
    highlightElement: 'nav',
    codeSnippet: `.nav-list {
  display: flex;
  gap: 16px;
  ???: row;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'flex-direction: row;' },
      { id: 'b', label: 'B', code: 'align-items: row;' },
      { id: 'c', label: 'C', code: 'justify-content: row;' },
    ],
    correctAnswer: 'a',
    explanation: 'flex-direction: row arranges flex items horizontally (the default). align-items controls cross-axis alignment, and justify-content controls main-axis distribution—neither sets the direction.',
  },
  {
    id: 'easy-3',
    title: 'Main Content Area',
    description: 'The main content area uses a two-column layout. Which CSS creates equal-width columns with a gap?',
    highlightElement: 'main',
    codeSnippet: `.content {
  display: grid;
  ???;
  gap: 2rem;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'grid-template-columns: 1fr 1fr' },
      { id: 'b', label: 'B', code: 'grid-columns: 2' },
      { id: 'c', label: 'C', code: 'columns: 2' },
    ],
    correctAnswer: 'a',
    explanation: 'grid-template-columns: 1fr 1fr creates two equal-width columns using fractional units (fr). The "1fr" unit means each column takes one equal fraction of the available space, automatically adjusting to the container width. This is more flexible than fixed pixel widths.',
  },
  {
    id: 'easy-4',
    title: 'Article Card Styling',
    description: 'Each article card has rounded corners. Which CSS property creates this rounded border effect?',
    highlightElement: 'article',
    codeSnippet: `.article-card {
  background: #16213e;
  ???: 12px;
  padding: 24px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'border-radius: 12px;' },
      { id: 'b', label: 'B', code: 'corner-radius: 12px;' },
      { id: 'c', label: 'C', code: 'round: 12px;' },
    ],
    correctAnswer: 'a',
    explanation: 'border-radius creates rounded corners on elements. The value determines how much the corners are rounded. There is no "corner-radius" or "round" property in CSS.',
  },
  {
    id: 'easy-5',
    title: 'Footer Semantic',
    description: 'What semantic element should wrap the copyright and footer links at the bottom of the page?',
    highlightElement: 'footer',
    codeSnippet: `<???>
  <p>&copy; 2024 My Blog</p>
  <nav>Privacy | Terms</nav>
</???>`,
    choices: [
      { id: 'a', label: 'A', code: '<footer>' },
      { id: 'b', label: 'B', code: '<bottom>' },
      { id: 'c', label: 'C', code: '<div class="footer">' },
    ],
    correctAnswer: 'a',
    explanation: 'The <footer> element is the semantic choice for page footers containing copyright, links, and contact info. There is no <bottom> element in HTML.',
  },
];

export const easyLevel: Level = {
  id: 'easy',
  title: 'Blog Layout',
  description: 'Build a simple blog with semantic HTML and basic flexbox. Perfect for beginners.',
  difficulty: 'easy',
  questions,
  designElements: [
    { id: 'header', name: 'Header', styles: { padding: '16px 24px', backgroundColor: '#1a1a2e', display: 'flex', gap: '24px', justifyContent: 'space-between' } },
    { id: 'nav', name: 'Navigation', styles: { display: 'flex', flexDirection: 'row', gap: '16px', padding: '8px' } },
    { id: 'main', name: 'Main Content', styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '24px' } },
    { id: 'article', name: 'Article Card', styles: { padding: '24px', backgroundColor: '#16213e', borderRadius: '12px' } },
    { id: 'footer', name: 'Footer', styles: { padding: '24px', backgroundColor: '#1a1a2e' } },
  ],
  DesignComponent: EasyDesign,
};
