import React from 'react'
import { useState, useEffect } from "react";
import Link from "next/link";
import Style from "../styles/newStyle.module.css";


const Navbar = () => {

    const [navTop, setNavTop] = useState(20);
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop =
          window.scrollX || document.documentElement.scrollTop;
        setNavTop(20 - scrollTop);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  return (
    <div>
      <nav className={Style.nava} style={{ top: `${navTop}px` }}>
        <ul>
          <li>
            {/* Use Link component to navigate to the About page */}
            <Link href="/about">About</Link>
          </li>
          <li>
            {/* Use Link component to navigate to the Home page */}
            <Link href="/">Home</Link>
          </li>
          <li>
            {/* Use Link component to navigate to the Contacts page */}
            <Link href="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
