import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:3000/logout', {
      credentials:'include',
      method:'POST'
    });

    setUsername(null);
  }
  return (
    <header>
      <Link to="/" className="logo">
        <span className="logo-side-mark">&lt; </span>Blog
        <span className="logo-side-mark"> /&gt;</span>
      </Link>
      <nav>
        {username && (
          <>
            <Link className="create-post" to="/create">
              Create new post
            </Link>
            <a onClick={logout} className="logout" >Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
