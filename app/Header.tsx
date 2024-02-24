import React from "react";
import styles from "./styles/Header.module.css";
import Link from "next/link";
import Search from "./components/Search";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Belgrade Gaming Events</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
