import { z } from "zod";
import { apiFetch } from "../core/fetcher";
import { type FetchOptions, type User, type ApiResponse, UserSchema } from "../core/types";
import { SERVER_BASE_URL } from "../core/constants";
import { appendSearchParams } from "../core/utils";

export async function fetchUsers(options?: FetchOptions): Promise<ApiResponse<User[]>> {
  const url = new URL(`${SERVER_BASE_URL}/api/users`);

  if (options) {
    appendSearchParams(url, options);
  }

  return apiFetch<User[]>(url, z.array(UserSchema));
}
