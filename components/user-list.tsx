'use client';

import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";
import Link from "next/link";

export function UserList() {
  const z = useZero();
  const [users] = useQuery(z.query.user);
  return (
    <div className="">
      <ul className="list-disc list-inside">
        {users.map(u => (
          <li key={u.id}>
            <Link href={`/users/${u.id}`} className="underline">
              {u.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
