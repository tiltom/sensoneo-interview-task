import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCompanies, fetchUsers, type FetchOptions } from "../../../../../api";

const PENDING_PRODUCT_PARAMS: FetchOptions = { active: false, page: 1, limit: 1 };
export const ACTIVE_PRODUCT_PARAMS: FetchOptions = { active: true, page: 1, limit: 1 };
const COMPANIES_PARAMS: FetchOptions = { limit: 1 };
const USERS_PARAMS: FetchOptions = { limit: 1 };

export function useGetDashboardStatistics() {
  const { data: activeProducts, isLoading: isLoadingActive } = useQuery({
    queryKey: ["products", ACTIVE_PRODUCT_PARAMS] as const,
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return fetchProducts(params);
    },
  });

  const { data: pendingProducts, isLoading: isLoadingPending } = useQuery({
    queryKey: ["products", PENDING_PRODUCT_PARAMS] as const,
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return fetchProducts(params);
    },
  });

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies", COMPANIES_PARAMS] as const,
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return fetchCompanies(params);
    },
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users", USERS_PARAMS] as const,
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return fetchUsers(params);
    },
  });

  return {
    activeProducts: {
      count: activeProducts?.pagination?.totalItems ?? 0,
      isLoading: isLoadingActive,
    },
    pendingProducts: {
      count: pendingProducts?.pagination?.totalItems ?? 0,
      isLoading: isLoadingPending,
    },
    companies: {
      count: companies?.total ?? 0,
      isLoading: isLoadingCompanies,
    },
    users: {
      count: users?.total ?? 0,
      isLoading: isLoadingUsers,
    },
  };
}
