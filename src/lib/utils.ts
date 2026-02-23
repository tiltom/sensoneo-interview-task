import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
};

export function formatVolume(volume: number) {
  if (volume >= 1000) {
    return `${volume / 1000}L`;
  }
  return `${volume}ml`;
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
