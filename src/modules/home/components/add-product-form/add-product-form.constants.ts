import type { ProductFormValues } from "./add-product-form.types";

export const DEFAULT_VALUES: ProductFormValues = {
  name: "",
  packaging: "pet",
  deposit: 0,
  volume: 1,
  companyId: null,
  registeredById: null,
};