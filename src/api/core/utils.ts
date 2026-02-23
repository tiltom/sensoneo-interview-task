import type { FetchOptions } from "./types";

export function appendSearchParams(url: URL, options: FetchOptions): void {
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });
}
