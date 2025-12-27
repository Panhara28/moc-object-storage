"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface MediaFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  createdAtSort: string;
  onCreatedAtSortChange: (value: string) => void;
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
  searchValue,
  onSearchChange,
  createdAtSort,
  onCreatedAtSortChange,
}: MediaFiltersProps) {
  return (
    <div className="mb-8">
      <div className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_180px_180px] sm:items-center">
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search folders and media..."
        />
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
        <Select
          value={createdAtSort}
          onValueChange={(value) => onCreatedAtSortChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
