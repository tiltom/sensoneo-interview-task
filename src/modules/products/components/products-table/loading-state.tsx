import { Skeleton } from "../../../../components/skeleton";
import { TableCell, TableRow } from "../../../../components/table";
import { PAGE_SIZE } from "./products-table.constants";
import { getProductColumnClass } from "./products-table.utils";

export function LoadingState() {
  return (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <TableRow key={i} className="flex border-b hover:bg-transparent">
          <TableCell className={getProductColumnClass("name")}>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell className={getProductColumnClass("packaging")}>
            <Skeleton className="h-4 w-[60px]" />
          </TableCell>
          <TableCell className={getProductColumnClass("volume")}>
            <Skeleton className="h-4 w-[40px]" />
          </TableCell>
          <TableCell className={getProductColumnClass("deposit")}>
            <Skeleton className="h-4 w-[40px]" />
          </TableCell>
          <TableCell className={getProductColumnClass("registeredAt")}>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
          <TableCell className={getProductColumnClass("active")}>
            <Skeleton className="h-5 w-[50px] rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}