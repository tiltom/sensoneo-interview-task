import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/select";
import { Alert, AlertTitle, AlertDescription } from "../../../../components/alert";
import { useAddProduct } from "./hooks/use-add-product";
import { FormItem } from "../../../../components/form-item";
import { EntitySelectField } from "../../../../components/entity-select-field";
import { PACKAGING_OPTIONS, type Company, type User } from "../../../../api";
import { capitalize } from "../../../../lib/utils";

export function AddProductForm() {
  const {
    form,
    onSubmit,
    companies,
    users,
    isLoadingCompanies,
    isLoadingUsers,
    isPending,
    error,
    isSuccess,
  } = useAddProduct();

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = form;

  const formData = watch();

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {isSuccess && !isDirty && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            Product has been created successfully. You can add another one or close this window.
          </AlertDescription>
        </Alert>
      )}

      <FormItem label="Product Name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Enter product name" />
      </FormItem>

      <div className="grid grid-cols-3 gap-4">
        <FormItem label="Packaging" error={errors.packaging?.message}>
          <Select
            value={formData.packaging || ""}
            onValueChange={(val) => setValue("packaging", val as typeof PACKAGING_OPTIONS[number], { shouldValidate: true })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {PACKAGING_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {capitalize(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem label="Volume (ml)" error={errors.volume?.message}>
          <Input
            type="number"
            min="1"
            {...register("volume", { valueAsNumber: true })}
            placeholder="500"
          />
        </FormItem>

        <FormItem label="Deposit (cents $)" error={errors.deposit?.message}>
          <Input
            type="number"
            min="0"
            {...register("deposit", { valueAsNumber: true })}
            placeholder="15"
          />
        </FormItem>
      </div>

      <EntitySelectField
        label="Company"
        error={errors.companyId?.message}
        value={formData.companyId}
        onChange={(val) => setValue("companyId", val as number, { shouldValidate: true })}
        options={companies.map((company: Company) => ({ id: company.id, label: company.name }))}
        isLoading={isLoadingCompanies}
        placeholder="Select company"
      />

      <EntitySelectField
        label="Registered By"
        error={errors.registeredById?.message}
        value={formData.registeredById}
        onChange={(val) => setValue("registeredById", val as number, { shouldValidate: true })}
        options={users.map((user: User) => ({ id: user.id, label: `${user.name} (${user.email})` }))}
        isLoading={isLoadingUsers}
        placeholder="Select user"
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={!isValid || isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating product...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
}
