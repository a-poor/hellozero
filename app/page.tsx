import Link from "next/link";

export default function Page() {
  return (
    <>
      <p><Link href="/sign-in">Sign-In</Link></p>
      <p><Link href="/tasks">Tasks</Link></p>
      <p><Link href="/users">Users</Link></p>
    </>
  );
}
