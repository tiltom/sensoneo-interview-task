import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCompanies,
  fetchUsers,
  createProduct,
  type CreateProductData,
  CreateProductSchema,
} from "../../../../../api";
import { DEFAULT_VALUES } from "../add-product-form.constants";
import type { ProductFormValues } from "../add-product-form.types";
import { ACTIVE_PRODUCT_PARAMS } from "../../dashboard-statistics/hooks/use-get-dashboard-statistics";

export function useAddProduct() {
  const queryClient = useQueryClient();

  const { data: companiesData, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
  });

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(CreateProductSchema),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const mutation = useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
        predicate: (query) => query.queryKey[1] !== ACTIVE_PRODUCT_PARAMS,
      });
      form.reset();
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    mutation.mutate(data as CreateProductData);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    companies: companiesData?.data ?? [],
    users: usersData?.data ?? [],
    isLoadingCompanies,
    isLoadingUsers,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error?.message,
  };
}
