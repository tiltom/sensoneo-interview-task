import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product, type FetchOptions } from "../../../../../api";

const PARAMS: FetchOptions = { active: true, limit: 5, sort: "registeredAt", order: "desc" };

export function useGetRecentProducts(): { recentProducts: Product[]; isLoading: boolean } {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", PARAMS] as const,
    queryFn: ({ queryKey }) => {
      const [, queryParams] = queryKey;
      return fetchProducts(queryParams);
    },
  });

  const recentProducts: Product[] = products?.data ?? [];

  return { recentProducts, isLoading };
}
