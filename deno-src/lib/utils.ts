// deno-src/lib/utils.ts
import { clsx } from "../../deps.ts"; // Adjusted path to root deps.ts
import type { ClassValue } from "../../deps.ts"; // Adjusted path to root deps.ts
import { twMerge } from "../../deps.ts"; // Adjusted path to root deps.ts

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
