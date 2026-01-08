import { useState, useMemo } from "react";
import { useCases, sectors, UseCase } from "@/data/useCases";
import { SectorFilter } from "@/components/SectorFilter";
import { Matrix2x2 } from "@/components/Matrix2x2";
import { UseCaseDetails } from "@/components/UseCaseDetails";
import { UseCaseList } from "@/components/UseCaseList";

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const filteredUseCases = useMemo(() => {
    if (selectedSector === "all") return useCases;
    return useCases.filter((uc) => uc.sector === selectedSector);
  }, [selectedSector]);

  const handleSelectUseCase = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
  };

  const handleCloseDetails = () => {
    setSelectedUseCase(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Deloitte GPS AI Use Cases Tool
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Explore, Define, Prioritize AI Use Cases
                {/* Explore {useCases.length} AI applications across government
                sectors */}
              </p>
            </div>
            <SectorFilter
              sectors={sectors}
              selectedSector={selectedSector}
              onSectorChange={setSelectedSector}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          {/* Left Column - Use Case List */}
          <div className="lg:col-span-3 h-full overflow-hidden">
            <UseCaseList
              useCases={filteredUseCases}
              selectedUseCase={selectedUseCase}
              onSelectUseCase={handleSelectUseCase}
            />
          </div>

          {/* Center Column - Matrix */}
          <div className="lg:col-span-5 h-full overflow-auto">
            <Matrix2x2
              useCases={filteredUseCases}
              selectedUseCase={selectedUseCase}
              onSelectUseCase={handleSelectUseCase}
            />
          </div>

          {/* Right Column - Details Panel */}
          <div className="lg:col-span-4 h-full">
            {selectedUseCase ? (
              <UseCaseDetails
                useCase={selectedUseCase}
                onClose={handleCloseDetails}
              />
            ) : (
              <div className="bg-card rounded-xl border border-border h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select a Use Case
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[240px]">
                    Click on any use case from the list or matrix to view its
                    details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
