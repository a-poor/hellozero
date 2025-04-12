import { getUsers, signIn, signOut, getUser } from '@/lib/auth';

export default async function Page() {
  const user = await getUser();
  const users = await getUsers();
  return (
    <>
      <h1>Sign In Page</h1>
      <p>Current user: {user ? <i>{user.sub}</i> : "(anon)"}</p>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>
            <SignInForm id={user.id} name={user.name} />
          </li>
        ))}
      </ul>
      {user && (
        <form action={signOut}>
          <button type="submit">(Sign-Out)</button>
        </form>
      )}
    </>
  );
}

function SignInForm({id, name}: {id: string, name: string}) {
  return (
    <form className="inline" action={signIn}>
      <input type="hidden" name="id" value={id} />
      <button type="submit">{name}</button>
    </form>
  )
}