import Link from "next/link";
import { ZeroProvider } from "@/components/zero";
import { getUser, getToken } from "@/lib/auth";
import { ClientOnly } from "@/components/client-only";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  const user = await getUser();
  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2 mb-4">
          <Link href="/tasks">
            Tasks
          </Link>
          <Link href="/users">
            Users
          </Link>
          <Link href="/sign-in">
            Sign-In
          </Link>
        </div>
        <div>
          Current user: {user?.sub || "(anon)"}
        </div>
      </div>
      <ClientOnly>
        <ZeroProvider userID={user?.sub || "anon"} token={token || ""}>
          {children}
        </ZeroProvider>
      </ClientOnly>
    </>
  );
}
