import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "../../../../components/badge";
import { capitalize, formatCurrency, formatDate, formatVolume } from "../../../../lib/utils";
import type { Product } from "../../../../api";

const productsColumnHelper = createColumnHelper<Product>();

export const PRODUCTS_COLUMNS = [
  productsColumnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
  }),
  productsColumnHelper.accessor("packaging", {
    header: "Packaging",
    cell: (info) => <span className="text-xs">{capitalize(info.getValue())}</span>,
  }),
  productsColumnHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => formatVolume(info.getValue()),
  }),
  productsColumnHelper.accessor("deposit", {
    header: "Deposit",
    cell: (info) => formatCurrency(info.getValue()),
  }),
  productsColumnHelper.accessor("registeredAt", {
    header: "Registered At",
    cell: (info) => formatDate(info.getValue()),
  }),
  productsColumnHelper.accessor("active", {
    header: "Status",
    cell: (info) => (
      <Badge variant={info.getValue() ? "default" : "secondary"}>
        {info.getValue() ? "Active" : "Inactive"}
      </Badge>
    ),
  }),
];

export const PAGE_SIZE = 15;
