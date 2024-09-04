import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials:'include'
    })
  },[])
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