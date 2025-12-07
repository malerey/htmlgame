import { DesignCanvasProps } from '@/types/game';
import { cn } from '@/lib/utils';

export function MediumDesign({
  highlightedElement,
  hoveredElement,
  onElementHover,
  onElementLeave,
}: DesignCanvasProps) {
  const isHighlighted = (id: string) => highlightedElement === id || hoveredElement === id;

  return (
    <div className="w-[600px] bg-[#0a0a1a] rounded-lg overflow-hidden shadow-2xl">
      {/* Hero */}
      <div
        className={cn(
          "p-12 text-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a1a] transition-all cursor-pointer",
          isHighlighted('hero') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('hero', e)}
        onMouseLeave={onElementLeave}
      >
        <h1 className="text-3xl font-bold text-foreground mb-4">Build Amazing Products</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          The all-in-one platform for modern development teams
        </p>
        <button
          className={cn(
            "px-8 py-3 rounded-lg font-semibold text-primary-foreground transition-all cursor-pointer",
            "bg-gradient-to-r from-[#667eea] to-[#764ba2]",
            isHighlighted('cta-button') && "inspector-outline"
          )}
          onMouseEnter={(e) => { e.stopPropagation(); onElementHover('cta-button', e); }}
          onMouseLeave={onElementLeave}
        >
          Get Started Free
        </button>
      </div>

      {/* Features */}
      <div
        className={cn(
          "p-8 flex gap-6 transition-all cursor-pointer",
          isHighlighted('features') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('features', e)}
        onMouseLeave={onElementLeave}
      >
        {['Fast', 'Secure', 'Scale'].map((feature) => (
          <div
            key={feature}
            className={cn(
              "flex-1 p-6 bg-[#16213e] rounded-xl text-center transition-all cursor-pointer",
              isHighlighted('feature-card') && "inspector-outline"
            )}
            onMouseEnter={(e) => { e.stopPropagation(); onElementHover('feature-card', e); }}
            onMouseLeave={onElementLeave}
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary text-xl">✦</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{feature}</h3>
            <p className="text-sm text-muted-foreground">Lightning fast performance for your apps</p>
          </div>
        ))}
      </div>
    </div>
  );
}
