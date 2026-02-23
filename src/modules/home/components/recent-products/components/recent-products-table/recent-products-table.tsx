import { formatVolume, formatCurrency, formatDate, capitalize, cn } from "../../../../../../lib/utils";
import { TableCell, TableRow } from "../../../../../../components/table";
import type { Product } from "../../../../../../api";

type RecentProductsTableProps = {
  products: Product[];
};

export function RecentProductsTable({ products }: RecentProductsTableProps) {
  if (products.length === 0) {
    return (
      <TableRow className="border-0">
        <TableCell colSpan={2} className="px-6 py-8 text-center text-sm text-muted-foreground">
          No recent products found.
        </TableCell>
      </TableRow>
    );
  }

  return products.map((product, index) => (
    <TableRow key={product.id} className="border-0">
      <TableCell className={cn("px-6 py-4", index === products.length - 1 && "pb-0")}>
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-none">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatVolume(product.volume)} • {formatCurrency(product.deposit)} deposit •{" "}
            {capitalize(product.packaging)}
          </p>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 text-right align-top">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDate(product.registeredAt)}
        </span>
      </TableCell>
    </TableRow>
  ));
}
