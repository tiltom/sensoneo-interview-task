import { flexRender, type Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "../../../../components/table";
import { getProductColumnClass } from "./products-table.utils";
import { PRODUCTS_COLUMNS } from "./products-table.constants";
import type { Product } from "../../../../api";

type TableContentProps = {
  table: Table<Product>;
};

export function TableContent({ table }: TableContentProps) {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <TableRow className="flex border-0">
        <TableCell
          colSpan={PRODUCTS_COLUMNS.length}
          className="flex w-full justify-center py-10 text-center text-sm text-muted-foreground"
        >
          No products found.
        </TableCell>
      </TableRow>
    );
  }

  return rows.map((row) => (
    <TableRow
      key={row.id}
      className="flex border-b hover:bg-muted/50 transition-colors"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className={getProductColumnClass(cell.column.id)}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}
