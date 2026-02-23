import { z } from "zod";
import { apiFetch } from "../core/fetcher";
import { type FetchOptions, ProductSchema, type Product, type ApiResponse, type CreateProductData } from "../core/types";
import { SERVER_BASE_URL } from "../core/constants";
import { appendSearchParams } from "../core/utils";

export async function fetchProducts(options?: FetchOptions): Promise<ApiResponse<Product[]>> {
  const url = new URL(`${SERVER_BASE_URL}/api/products`);

  if (options) {
    appendSearchParams(url, options);
  }

  return apiFetch<Product[]>(url, z.array(ProductSchema));
}

export async function createProduct(product: CreateProductData): Promise<ApiResponse<Product>> {
  return apiFetch<Product>(`${SERVER_BASE_URL}/api/products`, ProductSchema, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}
