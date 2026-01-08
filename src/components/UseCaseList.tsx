import { UseCase } from "@/data/useCases";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface UseCaseListProps {
  useCases: UseCase[];
  selectedUseCase: UseCase | null;
  onSelectUseCase: (useCase: UseCase) => void;
}

export function UseCaseList({ useCases, selectedUseCase, onSelectUseCase }: UseCaseListProps) {
  const getComplexityDot = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactDot = (impact: string) => {
    switch (impact) {
      case 'Low': return 'bg-slate-400';
      case 'Medium': return 'bg-blue-500';
      case 'High': return 'bg-emerald-500';
      case 'Very High': return 'bg-emerald-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <h2 className="font-semibold text-foreground">
          Use Cases ({useCases.length})
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => onSelectUseCase(uc)}
              className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/50 ${
                selectedUseCase?.id === uc.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-muted-foreground font-mono mt-0.5">
                  #{uc.id}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                    {uc.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {uc.sector}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${getComplexityDot(uc.implementationComplexity)}`} title={`Complexity: ${uc.implementationComplexity}`}></span>
                      <span className={`w-2 h-2 rounded-full ${getImpactDot(uc.impact)}`} title={`Impact: ${uc.impact}`}></span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
