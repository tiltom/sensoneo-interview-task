export const PRODUCT_STATUS_FILTER = {
  ALL: "all",
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type ProductStatusFilter = typeof PRODUCT_STATUS_FILTER[keyof typeof PRODUCT_STATUS_FILTER];

export const PRODUCT_STATUS_OPTIONS: { value: ProductStatusFilter; label: string }[] = [
  { value: PRODUCT_STATUS_FILTER.ALL, label: "All Statuses" },
  { value: PRODUCT_STATUS_FILTER.ACTIVE, label: "Active Only" },
  { value: PRODUCT_STATUS_FILTER.INACTIVE, label: "Inactive Only" },
];

export const PRODUCT_STATUS_ACTIVE_MAP: Record<ProductStatusFilter, boolean | undefined> = {
  [PRODUCT_STATUS_FILTER.ALL]: undefined,
  [PRODUCT_STATUS_FILTER.ACTIVE]: true,
  [PRODUCT_STATUS_FILTER.INACTIVE]: false,
};
