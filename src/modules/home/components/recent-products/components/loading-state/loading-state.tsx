import { Skeleton } from "../../../../../../components/skeleton";
import { TableCell, TableRow } from "../../../../../../components/table";

export function LoadingState() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i} className="hover:bg-transparent border-0">
      <TableCell className="px-6 py-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        <Skeleton className="ml-auto h-3 w-20" />
      </TableCell>
    </TableRow>
  ));
}
