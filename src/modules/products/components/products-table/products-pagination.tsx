import { cn } from "../../../../lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
} from "../../../../components/pagination";
import { useCallback } from "react";

type ProductsPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export function ProductsPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: ProductsPaginationProps) {
  const handlePageChange = useCallback((newPage: number, condition: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (condition) {
      onPageChange(newPage);
    }
  }, [onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            onClick={handlePageChange(1, hasPreviousPage)}
            className={cn(!hasPreviousPage && "bg-transparent pointer-events-none opacity-50")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePageChange(Math.max(1, currentPage - 1), hasPreviousPage)}
            className={cn(!hasPreviousPage && "bg-transparent pointer-events-none opacity-50")}
          />
        </PaginationItem>

        <div className="text-sm px-4 text-muted-foreground whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={handlePageChange(currentPage + 1, hasNextPage)}
            className={cn(!hasNextPage && "bg-transparent pointer-events-none opacity-50")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            onClick={handlePageChange(totalPages, hasNextPage)}
            className={cn(!hasNextPage && "bg-transparent pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
