"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";

const AuthContext = createContext<any>({});

interface Props {
  children: ReactNode;
}

interface User {
  username?: string;
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User

  const register = async (user: User) => {
    console.log(user);
  };

  // Login User

  const login = async ({ email: identifier, password }: User) => {
    console.log({ identifier, password });
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
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext