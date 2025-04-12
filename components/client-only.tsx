"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export function ClientOnly({ children, fallback }: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);
  if (!isClient) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
