"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "@/app/styles/AuthForm.module.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    register({ username, email, password });
  };

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> Register
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <input type="submit" value="Register" className="btn" />
      </form>
      <p>
        Already have an account? <Link href="/account/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
