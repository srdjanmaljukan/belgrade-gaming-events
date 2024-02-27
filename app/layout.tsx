import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./styles/Layout.module.css"
import Header from "./Header"
import Footer from "./Footer";
import Modal from "./components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belgrade Gaming Events",
  description: "Find best and most recent board and video gaming events in town.",
  keywords: "gaming, video games, board games, belgrade"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " " + styles.container}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
