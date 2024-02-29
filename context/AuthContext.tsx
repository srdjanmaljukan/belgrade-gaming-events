"use client";

import { createContext, useState, useEffect, ReactNode, PropsWithChildren } from "react";
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

  const test = async () => {
    console.log(user);
    console.log(error);
  }

  // Register User

  const register = async (user: User) => {
    console.log(user);
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

    console.log(data);

    if (res.ok) {
      setUser(data.user)
    } else {
      setError(data.message);
      // setError(null)
    }
  };

  // Logout User

  const logout = async () => {
    console.log("Logout");
  };

  // Check if User is logged in

  const checkUserLoggedIn = async (user: User) => {
    console.log("Check");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, test }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
