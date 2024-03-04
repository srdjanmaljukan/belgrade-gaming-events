"use client";

import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { NEXT_URL } from "@/config";

const AuthContext = createContext<any>({});

interface User {
  username?: string;
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {checkUserLoggedIn(user)}, [])

  // Register User

  const register = async (user: User) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    console.log(data)

    if (res.ok) {
      setUser(data.user)
      router.push("/account/dashboard")
    } else {
      setError(data.message);
      // setError(null)
    }
  };

  // Login User

  const login = async ({ email: identifier, password }: User) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data)

    if (res.ok) {
      setUser(data.user)
      router.push("/account/dashboard")
    } else {
      setError(data.message);
      // setError(null)
    }
  };

  // Logout User

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "post"
    })

    if (res.ok) {
      setUser(null);
      router.push("/")
    }
  };

  // Check if User is logged in

  const checkUserLoggedIn = async (user: User | null) => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (data.user) {
      setUser(data.user)
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
