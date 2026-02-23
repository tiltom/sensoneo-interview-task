import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type FetchOptions } from "../../../api";

export function useGetProducts({ active, limit = 20, page = 1, sort = "registeredAt", order = "desc" }: FetchOptions = {}) {
  return useQuery({
    queryKey: ["products", { active, limit, page, sort, order }] as const,
    queryFn: ({queryKey}) => {
      const [, params] = queryKey;
      return fetchProducts(params);
    },
  });
}
