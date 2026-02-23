import { cn } from "../../../../lib/utils";

export const getProductColumnClass = (columnId: string) => {
  return cn(
    "flex items-center px-4 py-3 min-w-0 overflow-hidden break-words whitespace-normal",
    columnId === "name" ? "flex-[2]" : "flex-1"
  );
};