import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";


const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    })
    .then((response) => {
      console.log('Response status:', response.status); // Log response status
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch profile");
      }
    })
    .then((userInfo) => {
      console.log('User Info:', userInfo); // Log user info
      setUserInfo(userInfo);
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      setUserInfo(null); // Clear user info on error
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST"
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

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
