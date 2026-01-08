import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SectorFilterProps {
  sectors: string[];
  selectedSector: string;
  onSectorChange: (sector: string) => void;
}

export function SectorFilter({ sectors, selectedSector, onSectorChange }: SectorFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-foreground">Filter by Sector:</label>
      <Select value={selectedSector} onValueChange={onSectorChange}>
        <SelectTrigger className="w-[300px] bg-card border-border">
          <SelectValue placeholder="All Sectors" />
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          <SelectItem value="all">All Sectors</SelectItem>
          {sectors.map((sector) => (
            <SelectItem key={sector} value={sector}>
              {sector}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
