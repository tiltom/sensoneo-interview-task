import type z from "zod";
import { CreateProductSchema } from "../../../../api";

export type ProductFormValues = z.input<typeof CreateProductSchema>;