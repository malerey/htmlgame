import { Level, Question } from '@/types/game';
import { MediumDesign } from './Design';

const questions: Question[] = [
  {
    id: 'med-1',
    title: 'Hero Centering',
    description: 'The hero section has perfectly centered content both horizontally and vertically. What CSS achieves this?',
    highlightElement: 'hero',
    codeSnippet: `.hero {
  display: flex;
  ???;
  min-height: 60vh;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'justify-content: center; align-items: center' },
      { id: 'b', label: 'B', code: 'text-align: center; vertical-align: middle' },
      { id: 'c', label: 'C', code: 'margin: auto' },
    ],
    correctAnswer: 'a',
    explanation: 'With flexbox, justify-content: center centers items along the main axis (horizontal by default), and align-items: center centers along the cross axis (vertical). Together, they create perfect centering both horizontally and vertically. text-align only affects inline content, and margin: auto works for single elements but not for flex containers.',
  },
  {
    id: 'med-2',
    title: 'CTA Button Styling',
    description: 'The call-to-action button has a gradient background. Which CSS property creates this effect?',
    highlightElement: 'cta-button',
    codeSnippet: `.cta-button {
  ???: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 16px 32px;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'background-color' },
      { id: 'b', label: 'B', code: 'background' },
      { id: 'c', label: 'C', code: 'gradient' },
    ],
    correctAnswer: 'b',
    explanation: 'The "background" shorthand property accepts gradients, images, colors, and more. background-color only accepts solid colors, so it cannot display gradients. There is no standalone "gradient" property in CSS—gradients are created using functions like linear-gradient() and applied via the background property.',
  },
  {
    id: 'med-3',
    title: 'Feature Cards Layout',
    description: 'The three feature cards are evenly distributed with the first card at the start and last card at the end. What creates this edge-to-edge distribution?',
    highlightElement: 'features',
    codeSnippet: `.features {
  display: flex;
  gap: 24px;
  ???;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'justify-content: space-between' },
      { id: 'b', label: 'B', code: 'justify-content: space-evenly' },
      { id: 'c', label: 'C', code: 'justify-content: space-around' },
    ],
    correctAnswer: 'a',
    explanation: 'justify-content: space-between places maximum space between items, pushing the first item to the container start and the last item to the container end. space-evenly would add equal space at the edges too, and space-around adds half-space at edges.',
  },
  {
    id: 'med-4',
    title: 'Card Equal Width',
    description: 'Each feature card takes exactly 1/3 of the available width (minus gaps). How is this achieved?',
    highlightElement: 'feature-card',
    codeSnippet: `.feature-card {
  ???;
  padding: 32px;
  background: #1a1a2e;
}`,
    choices: [
      { id: 'a', label: 'A', code: 'width: 33%' },
      { id: 'b', label: 'B', code: 'flex: 1' },
      { id: 'c', label: 'C', code: 'max-width: 300px' },
    ],
    correctAnswer: 'b',
    explanation: 'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0. It makes each flex item grow equally to fill available space, automatically accounting for gaps. Unlike width: 33%, which doesn\'t account for gaps and can cause overflow, flex: 1 ensures equal distribution regardless of gap size.',
  },
  {
    id: 'med-5',
    title: 'Button Hover Effect',
    description: 'The CTA button slightly enlarges on hover. Which CSS property creates this smooth scaling effect?',
    highlightElement: 'cta-button',
    codeSnippet: `.cta-button:hover {
  ???: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}`,
    choices: [
      { id: 'a', label: 'A', code: 'zoom' },
      { id: 'b', label: 'B', code: 'transform' },
      { id: 'c', label: 'C', code: 'size' },
    ],
    correctAnswer: 'b',
    explanation: 'transform: scale() smoothly resizes elements without affecting the document flow or layout of other elements. It uses GPU acceleration for smooth animations. The zoom property exists but is non-standard and affects layout, while "size" is not a valid CSS property.',
  },
];

export const mediumLevel: Level = {
  id: 'medium',
  title: 'Landing Page',
  description: 'Create a modern landing page with hero section, feature cards, and CTA buttons.',
  difficulty: 'medium',
  questions,
  designElements: [
    { id: 'hero', name: 'Hero Section', styles: { padding: '80px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' } },
    { id: 'cta-button', name: 'CTA Button', styles: { padding: '16px 32px', borderRadius: '8px', fontWeight: '600', background: 'linear-gradient(135deg, #667eea, #764ba2)' } },
    { id: 'features', name: 'Features Grid', styles: { display: 'flex', justifyContent: 'space-between', gap: '24px', padding: '64px 24px' } },
    { id: 'feature-card', name: 'Feature Card', styles: { flex: '1', padding: '32px', backgroundColor: '#16213e', borderRadius: '16px' } },
  ],
  DesignComponent: MediumDesign,
};
