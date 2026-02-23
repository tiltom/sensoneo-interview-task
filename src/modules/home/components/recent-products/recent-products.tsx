import { useGetRecentProducts } from "./hooks/use-get-recent-products";
import { Card, CardContent } from "../../../../components/card";
import { Table, TableBody } from "../../../../components/table";
import { LoadingState } from "./components/loading-state/loading-state";
import { RecentProductsTable } from "./components/recent-products-table/recent-products-table";

export function RecentProducts() {
  const { recentProducts, isLoading } = useGetRecentProducts();

  return (
    <Card className="shadow-none">
      <div className="border-b px-6 pb-2 pt-0">
        <h2 className="text-lg font-bold">Recent products</h2>
      </div>
      <CardContent className="p-0 py-0">
        <Table>
          <TableBody>
            {isLoading ? (
              <LoadingState />
            ) : (
              <RecentProductsTable products={recentProducts} />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
