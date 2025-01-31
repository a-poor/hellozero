'use client';

import { Zero } from "@rocicorp/zero";
import { ZeroProvider as ZeroProviderBase, useZero as _useZero } from "@rocicorp/zero/react";
import { schema, type Schema } from "@/schema";

const z = new Zero({
  userID: "u001",
  // auth: () => encodedJWT,
  server: process.env.NEXT_PUBLIC_SERVER,
  schema,
  kvStore: "mem", // 'idb'
});

export function ZeroProvider({ children }: { children: React.ReactNode }) {
  return (
    <ZeroProviderBase zero={z}>
      {children}
    </ZeroProviderBase>
  );
}

export const useZero = _useZero<Schema>;
