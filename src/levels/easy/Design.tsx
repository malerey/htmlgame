import { DesignCanvasProps } from '@/types/game';
import { cn } from '@/lib/utils';

export function EasyDesign({
  highlightedElement,
  hoveredElement,
  onElementHover,
  onElementLeave,
}: DesignCanvasProps) {
  const isHighlighted = (id: string) => highlightedElement === id || hoveredElement === id;

  return (
    <div className="w-[600px] bg-[#0a0a1a] rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div
        className={cn(
          "p-4 bg-[#1a1a2e] flex items-center justify-between transition-all cursor-pointer",
          isHighlighted('header') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('header', e)}
        onMouseLeave={onElementLeave}
      >
        <h1 className="text-lg font-bold text-foreground">My Blog</h1>
        <div
          className={cn(
            "flex gap-4 transition-all cursor-pointer",
            isHighlighted('nav') && "inspector-outline"
          )}
          onMouseEnter={(e) => { e.stopPropagation(); onElementHover('nav', e); }}
          onMouseLeave={onElementLeave}
        >
          <span className="text-sm text-muted-foreground hover:text-primary">Home</span>
          <span className="text-sm text-muted-foreground hover:text-primary">About</span>
          <span className="text-sm text-muted-foreground hover:text-primary">Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "p-6 grid grid-cols-2 gap-6 transition-all cursor-pointer",
          isHighlighted('main') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('main', e)}
        onMouseLeave={onElementLeave}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "p-6 bg-[#16213e] rounded-xl transition-all cursor-pointer",
              isHighlighted('article') && "inspector-outline"
            )}
            onMouseEnter={(e) => { e.stopPropagation(); onElementHover('article', e); }}
            onMouseLeave={onElementLeave}
          >
            <h3 className="font-semibold text-foreground mb-2">Article {i}</h3>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className={cn(
          "p-4 bg-[#1a1a2e] text-center transition-all cursor-pointer",
          isHighlighted('footer') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('footer', e)}
        onMouseLeave={onElementLeave}
      >
        <p className="text-sm text-muted-foreground">© 2024 My Blog</p>
      </div>
    </div>
  );
}
