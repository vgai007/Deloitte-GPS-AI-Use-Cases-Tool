import { UseCase, complexityToNumber, impactToNumber } from "@/data/useCases";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Matrix2x2Props {
  useCases: UseCase[];
  selectedUseCase: UseCase | null;
  onSelectUseCase: (useCase: UseCase) => void;
}

export function Matrix2x2({ useCases, selectedUseCase, onSelectUseCase }: Matrix2x2Props) {
  // Group use cases by quadrant
  const getQuadrant = (uc: UseCase): string => {
    const complexity = complexityToNumber(uc.implementationComplexity);
    const impact = impactToNumber(uc.impact);
    
    // Low complexity (1), High/Very High impact (3-4) -> Quick Wins (bottom-right)
    // Low complexity (1), Low/Medium impact (1-2) -> Low Priority (bottom-left)
    // High complexity (2-3), High/Very High impact (3-4) -> Strategic (top-right)
    // High complexity (2-3), Low/Medium impact (1-2) -> Consider Carefully (top-left)
    
    if (complexity <= 1.5 && impact >= 2.5) return 'quick-wins';
    if (complexity <= 1.5 && impact < 2.5) return 'low-priority';
    if (complexity > 1.5 && impact >= 2.5) return 'strategic';
    return 'consider';
  };

  const quadrants = {
    'consider': useCases.filter(uc => getQuadrant(uc) === 'consider'),
    'strategic': useCases.filter(uc => getQuadrant(uc) === 'strategic'),
    'low-priority': useCases.filter(uc => getQuadrant(uc) === 'low-priority'),
    'quick-wins': useCases.filter(uc => getQuadrant(uc) === 'quick-wins'),
  };

  const renderDot = (uc: UseCase) => {
    const isSelected = selectedUseCase?.id === uc.id;
    return (
      <Tooltip key={uc.id}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onSelectUseCase(uc)}
            className={`
              w-3 h-3 rounded-full transition-all duration-200 hover:scale-150 cursor-pointer
              ${isSelected 
                ? 'ring-2 ring-offset-1 ring-primary scale-150 bg-primary' 
                : 'bg-current opacity-80 hover:opacity-100'
              }
            `}
            aria-label={uc.name}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[300px] text-xs">
          <p className="font-semibold">{uc.name}</p>
          <p className="text-muted-foreground mt-1">
            Complexity: {uc.implementationComplexity} | Impact: {uc.impact}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const renderQuadrant = (
    title: string, 
    useCasesList: UseCase[], 
    bgClass: string,
    textClass: string
  ) => (
    <div className={`${bgClass} p-4 rounded-lg flex flex-col min-h-[200px]`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-sm ${textClass}`}>{title}</h3>
        <span className={`text-xs ${textClass} opacity-70`}>
          {useCasesList.length} use cases
        </span>
      </div>
      <div className={`flex flex-wrap gap-2 flex-1 content-start ${textClass}`}>
        {useCasesList.map(renderDot)}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Implementation Complexity vs Impact Matrix
      </h2>
      
      {/* Y-axis label */}
      <div className="flex">
        <div className="flex flex-col justify-center items-center pr-4 -rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span className="text-xs text-muted-foreground font-medium tracking-wider">
            IMPLEMENTATION COMPLEXITY
          </span>
          <div className="flex items-center gap-1 mt-2 rotate-180">
            <span className="text-[10px] text-muted-foreground">Low</span>
            <div className="w-8 h-px bg-muted-foreground/40"></div>
            <span className="text-[10px] text-muted-foreground">High</span>
          </div>
        </div>
        
        <div className="flex-1">
          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Top Left - High Complexity, Low Impact */}
            {renderQuadrant(
              "Consider Carefully",
              quadrants['consider'],
              "bg-amber-500/10",
              "text-amber-700"
            )}
            
            {/* Top Right - High Complexity, High Impact */}
            {renderQuadrant(
              "Strategic Initiatives",
              quadrants['strategic'],
              "bg-emerald-500/15",
              "text-emerald-700"
            )}
            
            {/* Bottom Left - Low Complexity, Low Impact */}
            {renderQuadrant(
              "Low Priority",
              quadrants['low-priority'],
              "bg-slate-500/10",
              "text-slate-600"
            )}
            
            {/* Bottom Right - Low Complexity, High Impact */}
            {renderQuadrant(
              "Quick Wins",
              quadrants['quick-wins'],
              "bg-emerald-500/20",
              "text-emerald-800"
            )}
          </div>
          
          {/* X-axis label */}
          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] text-muted-foreground">Low</span>
              <div className="w-8 h-px bg-muted-foreground/40"></div>
              <span className="text-[10px] text-muted-foreground">High</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium tracking-wider">
              IMPACT
            </span>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
          <span className="text-muted-foreground">Quick Wins: Low complexity, High impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
          <span className="text-muted-foreground">Strategic: High complexity, High impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-600"></div>
          <span className="text-muted-foreground">Consider: High complexity, Low impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500"></div>
          <span className="text-muted-foreground">Low Priority: Low complexity, Low impact</span>
        </div>
      </div>
    </div>
  );
}
