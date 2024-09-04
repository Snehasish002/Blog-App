import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <Link to="/" href="" className="logo">
          <span className="logo-side-mark">&lt; </span>Blog
          <span className="logo-side-mark"> /&gt;</span>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
    </header>
  )
}

export default Header;