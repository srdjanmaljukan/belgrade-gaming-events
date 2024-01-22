import React from 'react'
import styles from "./styles/Footer.module.css"
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; Belgrade Gaming Events 2024</p>
        <p>
            <Link href="/about">About This Project</Link>
        </p>
    </footer>
  )
}

export default Footer