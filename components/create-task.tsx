'use client';

import { nanoid } from "nanoid";
import { useZero } from "@/components/zero";
import { useState } from "react";
import { redirect } from "next/navigation";

export function CreateTask() {
  const z = useZero();
  const [name, setName] = useState("");
  return (
    <div className="grid grid-cols-1 gap-2">
      <label>Task:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => {
        z.mutate.task.insert({
          id: nanoid(),
          name,
          status: "not-started",
          createdById: z.userID,
          assignedToId: z.userID,
        });
        redirect("/tasks");
      }}>
        Create
      </button>
    </div>
  );
}