import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export let currencyFormatter = new Intl.NumberFormat("en-US");

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
}
