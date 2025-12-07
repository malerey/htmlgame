import { useState } from 'react';
import { Level } from '@/types/game';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignPreviewProps {
  level: Level;
  highlightedElement: string | null;
}

export function DesignPreview({
  level,
  highlightedElement,
}: DesignPreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<{ id: string; x: number; y: number } | null>(null);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(prev + 0.1, 1.5);
      return Math.max(prev - 0.1, 0.5);
    });
  };

  const handleElementHover = (elementId: string, e: React.MouseEvent) => {
    setHoveredElement(elementId);
    setShowTooltip({ id: elementId, x: e.clientX, y: e.clientY });
  };

  const handleElementLeave = () => {
    setHoveredElement(null);
    setShowTooltip(null);
  };

  const DesignComponent = level.DesignComponent;

  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-end px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="icon" onClick={() => handleZoom('out')}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleZoom('in')}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-3 lg:p-6 bg-muted/30">
        <div
          className="mx-auto transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${zoom})` }}
        >
          <DesignComponent
            highlightedElement={highlightedElement}
            hoveredElement={hoveredElement}
            onElementHover={handleElementHover}
            onElementLeave={handleElementLeave}
          />
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <ElementTooltip
          elementId={showTooltip.id}
          level={level}
          x={showTooltip.x}
          y={showTooltip.y}
        />
      )}
    </div>
  );
}

interface ElementTooltipProps {
  elementId: string;
  level: Level;
  x: number;
  y: number;
}

function ElementTooltip({ elementId, level, x, y }: ElementTooltipProps) {
  const element = level.designElements.find(el => el.id === elementId);
  const styles = element?.styles || {};

  return (
    <div
      className="fixed z-50 bg-popover border border-border rounded-lg p-3 shadow-xl pointer-events-none"
      style={{
        left: Math.min(x + 10, window.innerWidth - 250),
        top: Math.min(y + 10, window.innerHeight - 200),
      }}
    >
      <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
        {element?.name || elementId.replace('-', ' ')}
      </div>
      <div className="space-y-1">
        {Object.entries(styles).map(([prop, value]) => (
          <div key={prop} className="flex items-center gap-2 text-xs">
            <span className="text-accent font-mono">{prop}:</span>
            <span className="text-foreground font-mono">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
