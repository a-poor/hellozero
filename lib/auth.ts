'use server';

import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

const JWT_KEY = "token";

export type AuthData = {
  sub: string;
  name: string;
  admin: boolean;
  iat: number;
  exp: number;
};

const USERS = [
  { id: "u001", name: "Alice", admin: false },
  { id: "u002", name: "Bob", admin: false },
  { id: "u003", name: "Charlie", admin: true },
];

export const getUsers = async () => USERS;

async function makeToken(userId: string) {
  const secret = process.env.ZERO_AUTH_SECRET;
  if (!secret) {
    throw new Error("ZERO_AUTH_SECRET is not set");
  }
  const user = USERS.find((user) => user.id === userId);
  const data = {
    sub: userId,
    name: user?.name,
    admin: user?.admin,
  };
  const token = jwt.sign(data, secret, { expiresIn: "12h" });
  return {
    data,
    token,
  };
}

export async function signIn(formData: FormData) {
  const userId = formData.get("id") as string;
  if (!userId) {
    return;
  }
  const { token } = await makeToken(userId);
  const cookieStore = await cookies();
  cookieStore.set(JWT_KEY, token);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_KEY);
}


export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_KEY)?.value;
  if (!token) {
    return null;
  }
  const secret = process.env.ZERO_AUTH_SECRET;
  if (!secret) {
    throw new Error("ZERO_AUTH_SECRET is not set");
  }
  try {
    jwt.verify(token, secret);
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getUser(): Promise<AuthData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_KEY)?.value;
  if (!token) {
    return null;
  }
  const secret = process.env.ZERO_AUTH_SECRET;
  if (!secret) {
    throw new Error("ZERO_AUTH_SECRET is not set");
  }
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as AuthData;
  } catch (err) {
    console.error(err);
    return null;
  }
}
