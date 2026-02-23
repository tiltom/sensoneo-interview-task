import { Milk, Filter } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "../../components/page-header";
import { ProductsTable } from "./components/products-table/products-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import { Label } from "../../components/label";

import { PRODUCT_STATUS_FILTER, PRODUCT_STATUS_OPTIONS, PRODUCT_STATUS_ACTIVE_MAP, type ProductStatusFilter } from "./products.constants";

export function ProductsPage() {
  const [filter, setFilter] = useState<ProductStatusFilter>(PRODUCT_STATUS_FILTER.ALL);

  const active = PRODUCT_STATUS_ACTIVE_MAP[filter];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Registered products"
        description="View and manage your registered products."
        icon={<Milk size={28} />}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <Label htmlFor="status-filter" className="font-medium">Filter by status:</Label>
        </div>
        <Select
          value={filter}
          onValueChange={(val) => setFilter(val as ProductStatusFilter)}
        >
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ProductsTable active={active} />
    </div>
  );
}
