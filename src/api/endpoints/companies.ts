import { z } from "zod";
import { apiFetch } from "../core/fetcher";
import { type FetchOptions, CompanySchema, type Company, type ApiResponse } from "../core/types";
import { SERVER_BASE_URL } from "../core/constants";
import { appendSearchParams } from "../core/utils";

export async function fetchCompanies(options?: FetchOptions): Promise<ApiResponse<Company[]>> {
  const url = new URL(`${SERVER_BASE_URL}/api/companies`);

  if (options) {
    appendSearchParams(url, options);
  }

  return apiFetch<Company[]>(url, z.array(CompanySchema));
}
