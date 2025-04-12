'use client';

import { Zero } from "@rocicorp/zero";
import { ZeroProvider as ZeroProviderBase, useZero as _useZero } from "@rocicorp/zero/react";
import { schema, type Schema } from "@/schema";
import { useMemo } from "react";

const makeZ = (userID: string, token?: string) => new Zero({
  userID,
  auth: token,
  server: process.env.NEXT_PUBLIC_SERVER,
  schema,
  kvStore: "mem", // 'idb'
});

export function ZeroProvider({ userID, token, children }: {
  userID: string;
  token?: string;
  children: React.ReactNode;
}) {
  const z = useMemo(() => makeZ(userID, token), [userID, token]);
  return (
    <ZeroProviderBase zero={z}>
      {children}
    </ZeroProviderBase>
  );
}

export const useZero = _useZero<Schema>;
