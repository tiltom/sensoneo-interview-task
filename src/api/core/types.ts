import { z } from "zod";

export const PaginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  itemsPerPage: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const ProductSchema = z.object({
  id: z.number(),
  companyId: z.number(),
  registeredById: z.number(),
  name: z.string(),
  packaging: z.string(),
  deposit: z.number(),
  volume: z.number(),
  registeredAt: z.string(),
  active: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;

const packagingEnum = z.enum(["pet", "can", "glass", "tetra", "other"]);
export const PACKAGING_OPTIONS = packagingEnum.options;

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  registeredAt: true,
  active: true,
}).extend({
  name: z.string().min(1, "Name is required"),
  packaging: packagingEnum,
  deposit: z.number({ message: "Enter valid deposit amount in cents" }).int("Deposit must be in cents (integer)").min(0, "Deposit must be 0 or more"),
  volume: z.number({ message: "Enter valid volume in ml" }).min(1, "Volume must be at least 1 ml"),
  companyId: z.number({ message: "Select valid company" }).min(1, "Select valid company").nullable().refine((val) => val !== null, { message: "Select valid company" }),
  registeredById: z.number({ message: "Select valid user" }).min(1, "Select valid user").nullable().refine((val) => val !== null, { message: "Select valid user" }),
});

export type CreateProductData = z.infer<typeof CreateProductSchema>;

export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  registeredAt: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;

export const UserSchema = z.object({
  id: z.number(),
  companyId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  createdAt: z.string(),
}).transform((user) => ({
  ...user,
  name: `${user.firstName} ${user.lastName}`,
}));

export type User = z.infer<typeof UserSchema>;

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    pagination: PaginationSchema.optional(),
    total: z.number().optional(),
  });

export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>;

export const FetchOptionsSchema = z.object({
  active: z.boolean().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type FetchOptions = z.infer<typeof FetchOptionsSchema>;
