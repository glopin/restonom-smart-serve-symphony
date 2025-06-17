export * as esbuild from "https://deno.land/x/esbuild@v0.20.2/mod.js";
export * as React from "https://esm.sh/react@18.3.1";
export * as ReactDOM from "https://esm.sh/react-dom@18.2.0";
export * from "https://esm.sh/react-router-dom@6.23.1";
export { QueryClient, QueryClientProvider } from "https://esm.sh/@tanstack/react-query@5.37.1";
export * as http from "https://deno.land/std@0.224.0/http/server.ts";

export { clsx } from "https://esm.sh/clsx@2.1.1";
export type { ClassValue } from "https://esm.sh/clsx@2.1.1";
export { twMerge } from "https://esm.sh/tailwind-merge@2.3.0";
export * as TooltipPrimitive from "https://esm.sh/@radix-ui/react-tooltip@1.1.4";

export { cva } from "https://esm.sh/class-variance-authority@0.7.0";
export type { VariantProps } from "https://esm.sh/class-variance-authority@0.7.0";
export { X } from "https://esm.sh/lucide-react@0.462.0";
export * as ToastPrimitives from "https://esm.sh/@radix-ui/react-toast@1.2.1";

// New dependencies for Sonner and Theme
export { Toaster as SonnerPrimitive, toast as sonnerToast } from "https://esm.sh/sonner@1.5.0";
export { useTheme, ThemeProvider } from "https://esm.sh/next-themes@0.3.0";
