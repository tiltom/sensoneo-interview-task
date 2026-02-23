import { cn } from "../../../../lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetProducts } from "../../hooks/use-get-products";
import { usePagination } from "../../../../hooks/use-pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/table";
import { ProductsPagination } from "./products-pagination";
import { PAGE_SIZE, PRODUCTS_COLUMNS } from "./products-table.constants";
import { LoadingState } from "./loading-state";
import { getProductColumnClass } from "./products-table.utils";
import { TableContent } from "./table-content";

type ProductsTableProps = {
  active?: boolean;
}

export function ProductsTable({ active }: ProductsTableProps) {
  const { page, onPageChange } = usePagination();

  const { data: productsResponse, isLoading, isError } = useGetProducts({ 
    active, 
    page,
    limit: PAGE_SIZE 
  });

  const table = useReactTable({
    data: productsResponse?.data || [],
    columns: PRODUCTS_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <div className="text-center py-10 text-destructive">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table className="w-full table-fixed border-collapse">
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="flex border-b">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn("font-bold text-muted-foreground", getProductColumnClass(header.id))}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-background">
            {isLoading ? (
              <LoadingState />
            ) : (
              <TableContent table={table} />
            )}
          </TableBody>
        </Table>
      </div>

      {productsResponse?.pagination && (
        <ProductsPagination
          currentPage={productsResponse.pagination.currentPage}
          totalPages={productsResponse.pagination.totalPages}
          hasNextPage={productsResponse.pagination.hasNextPage}
          hasPreviousPage={productsResponse.pagination.hasPreviousPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
