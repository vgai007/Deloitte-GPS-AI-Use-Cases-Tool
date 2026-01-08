import { UseCase } from "@/data/useCases";
import { X, Clock, Zap, Target, Database, Building2, ChartBar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UseCaseDetailsProps {
  useCase: UseCase;
  onClose: () => void;
}

export function UseCaseDetails({ useCase, onClose }: UseCaseDetailsProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'High': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Very High': return 'bg-emerald-200 text-emerald-900 border-emerald-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border px-6 py-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs font-medium">
              #{useCase.id}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {useCase.sector}
            </Badge>
          </div>
          <h2 className="text-lg font-semibold text-foreground leading-tight">
            {useCase.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-medium">Complexity</span>
              </div>
              <Badge className={`${getComplexityColor(useCase.implementationComplexity)} border`}>
                {useCase.implementationComplexity}
              </Badge>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Impact</span>
              </div>
              <Badge className={`${getImpactColor(useCase.impact)} border`}>
                {useCase.impact}
              </Badge>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {useCase.implementationDuration} months
              </span>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                <ChartBar className="w-4 h-4" />
                <span className="text-xs font-medium">AI Type</span>
              </div>
              <span className="text-xs font-semibold text-foreground">
                {useCase.aiType}
              </span>
            </div>
          </div>

          {/* Problem Statement */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-destructive rounded-full"></span>
              Problem Statement
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {useCase.problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              Solution
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {useCase.solution}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-accent rounded-full"></span>
              Key Solution Features
            </h3>
            <p className="text-sm text-muted-foreground">
              {useCase.keySolutionFeatures}
            </p>
          </div>

          {/* Impact Metric */}
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Expected Impact
            </h3>
            <p className="text-lg font-bold text-primary">
              {useCase.impactMetric}
            </p>
          </div>

          {/* Datasets Required */}
          {useCase.datasetsRequired && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                Datasets Required
              </h3>
              <p className="text-sm text-muted-foreground">
                {useCase.datasetsRequired}
              </p>
            </div>
          )}

          {/* Solution Providers */}
          {useCase.solutionProviders && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Solution Providers
              </h3>
              <div className="flex flex-wrap gap-2">
                {useCase.solutionProviders.split(', ').map((provider, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {provider}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Type of Solution */}
          <div className="pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Type: </span>
            <span className="text-xs font-medium text-foreground">{useCase.typeOfSolution}</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
