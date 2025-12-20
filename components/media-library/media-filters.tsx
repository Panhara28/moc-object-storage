"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface MediaFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  itemCount: number;
}

const filters = [
  { value: "all", label: "All Media" },
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "document", label: "Documents" },
];

export default function MediaFilters({
  selectedFilter,
  onFilterChange,
}: MediaFiltersProps) {
  return (
    <div className="mb-8">
      <div className="w-full max-w-xs">
        <Select
          value={selectedFilter}
          onValueChange={(value) => onFilterChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter media..." />
          </SelectTrigger>

          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
