"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ValidateAuth } from "./validate-auth.provider";

export function QueryClientAndAuthProviders({ children }: any) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ValidateAuth>{children}</ValidateAuth>
    </QueryClientProvider>
  );
}
