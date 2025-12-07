import { DesignCanvasProps } from '@/types/game';
import { cn } from '@/lib/utils';

export function HardDesign({
  highlightedElement,
  hoveredElement,
  onElementHover,
  onElementLeave,
}: DesignCanvasProps) {
  const isHighlighted = (id: string) => highlightedElement === id || hoveredElement === id;

  return (
    <div className="w-[700px] bg-[#0a0a1a] rounded-lg overflow-hidden shadow-2xl flex">
      {/* Sidebar */}
      <div
        className={cn(
          "w-[180px] bg-[#0f0f23] p-4 flex flex-col gap-2 transition-all cursor-pointer",
          isHighlighted('sidebar') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('sidebar', e)}
        onMouseLeave={onElementLeave}
      >
        <div className="text-lg font-bold text-primary mb-4">Dashboard</div>
        {['Overview', 'Analytics', 'Reports', 'Settings'].map((item) => (
          <div key={item} className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer">
            {item}
          </div>
        ))}
      </div>

      {/* Main Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all cursor-pointer",
          isHighlighted('main-content') && "inspector-outline"
        )}
        onMouseEnter={(e) => onElementHover('main-content', e)}
        onMouseLeave={onElementLeave}
      >
        {/* Top Nav */}
        <div
          className={cn(
            "h-14 bg-[#1a1a2e] flex items-center justify-between px-6 transition-all cursor-pointer",
            isHighlighted('top-nav') && "inspector-outline"
          )}
          onMouseEnter={(e) => { e.stopPropagation(); onElementHover('top-nav', e); }}
          onMouseLeave={onElementLeave}
        >
          <span className="text-sm text-foreground">Welcome back, User</span>
          <div className="w-8 h-8 rounded-full bg-primary/30" />
        </div>

        {/* Dashboard Content */}
        <div
          className={cn(
            "flex-1 p-4 grid grid-cols-2 gap-4 transition-all cursor-pointer",
            isHighlighted('dashboard-content') && "inspector-outline"
          )}
          onMouseEnter={(e) => { e.stopPropagation(); onElementHover('dashboard-content', e); }}
          onMouseLeave={onElementLeave}
        >
          {['Revenue', 'Users', 'Orders', 'Growth'].map((stat) => (
            <div key={stat} className="p-4 bg-[#16213e] rounded-xl">
              <div
                className={cn(
                  "flex items-center justify-between mb-3 pb-3 border-b border-border transition-all cursor-pointer",
                  isHighlighted('card-header') && "inspector-outline"
                )}
                onMouseEnter={(e) => { e.stopPropagation(); onElementHover('card-header', e); }}
                onMouseLeave={onElementLeave}
              >
                <span className="text-sm font-medium text-foreground">{stat}</span>
                <span className="text-xs text-primary">↑</span>
              </div>
              <div className="text-2xl font-bold text-foreground">$12,345</div>
              <div className="text-xs text-muted-foreground mt-1">+12% from last month</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
