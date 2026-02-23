import { useState, useCallback } from "react";

type UsePaginationOptions = {
  initialPage?: number;
}

export function usePagination({ initialPage = 1 }: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);

  const onPageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    page,
    onPageChange,
  };
}
