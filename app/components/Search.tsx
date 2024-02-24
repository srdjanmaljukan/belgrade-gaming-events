"use client";

import React, { FormEventHandler } from 'react'
import styles from "@/app/styles/Search.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {

    const [term, setTerm] = useState("");

    const router = useRouter()

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/events/search?term=${term}`);
        setTerm("");
    }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search Events' />
      </form>
    </div>
  )
}

export default Search