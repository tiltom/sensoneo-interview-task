import { z } from "zod";
import { type ApiResponse, ApiResponseSchema } from "./types";

export async function apiFetch<T>(
  url: string | URL,
  dataSchema: z.ZodType<T>,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(url.toString(), options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "An unexpected error occurred");
  }

  const result = ApiResponseSchema(dataSchema).safeParse(json);
  if (!result.success) {
    console.error("API Validation Error:", z.treeifyError(result.error));
    throw new Error(`Data integrity error: ${result.error.message}`);
  }

  return result.data;
}
