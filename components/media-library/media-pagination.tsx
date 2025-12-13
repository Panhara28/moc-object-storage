"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MediaPagination({
  currentPage,
  totalPages,
  onPageChange,
}: MediaPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 py-3">
      {/* Previous */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-8 w-8"
      >
        <ChevronLeft className="w-3 h-3" />
      </Button>

      {/* First page if hidden */}
      {visiblePages[0] > 1 && (
        <>
          <Button
            onClick={() => onPageChange(1)}
            variant="outline"
            className="h-8 w-8 p-0 text-xs"
          >
            1
          </Button>
          <span className="text-muted-foreground text-xs px-1">...</span>
        </>
      )}

      {/* Pages */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={currentPage === page ? "default" : "outline"}
          className="h-8 w-8 p-0 text-xs"
        >
          {page}
        </Button>
      ))}

      {/* Last page if hidden */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          <span className="text-muted-foreground text-xs px-1">...</span>
          <Button
            onClick={() => onPageChange(totalPages)}
            variant="outline"
            className="h-8 w-8 p-0 text-xs"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        className="h-8 w-8"
      >
        <ChevronRight className="w-3 h-3" />
      </Button>
    </div>
  );
}
