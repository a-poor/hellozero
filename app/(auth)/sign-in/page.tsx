import { cookies } from 'next/headers';

const users = [
  {id: "u001", name: "Alice"},
  {id: "u002", name: "Bob"},
  {id: "u003", name: "Charlie"},
];

export default async function Page() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  return (
    <>
      <h1>Sign In Page</h1>
      <p>Current user: {userId ? <i>{userId}</i> : "(anon)"}</p>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>
            <SignInForm id={user.id} name={user.name} />
          </li>
        ))}
      </ul>
      {userId && (
        <div>
          <SignInForm id="" name="(Sign-Out)" />
        </div>
      )}
    </>
  );
}

async function signIn(formData: FormData) {
  "use server";
  const cookieStore = await cookies();
  const id = formData.get("id") as string;
  if (!id) {
    cookieStore.delete("userId");
    console.log("sign out");
    return;
  }
  console.log(`sign in as: ${id}`);
  cookieStore.set("userId", id);
}

function SignInForm({id, name}: {id: string, name: string}) {
  return (
    <form action={signIn} className="inline">
      <input type="hidden" name="id" value={id} />
      <button type="submit">{name}</button>
    </form>
  )
}