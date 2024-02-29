"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "@/app/styles/AuthForm.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, test } = useContext(AuthContext);

//   useEffect(() => {
//     console.log(error)
//   });


  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    test()
  };

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> Log In
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="btn" />
      </form>
      <p>
        Don't have an account? <Link href="/account/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
