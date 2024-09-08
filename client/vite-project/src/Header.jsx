import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  // useEffect(() => {
  //   fetch("http://localhost:3000/profile", {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((userInfo) => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    fetch("https://blog-app-backend-gujw.onrender.com/profile", {
      credentials: "include",
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch profile");
      }
    })
    .then((userInfo) => {
      setUserInfo(userInfo);
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      setUserInfo(null); // Clear user info on error
    });
  }, []);
  

  function logout() {
    fetch("https://blog-app-backend-gujw.onrender.com/logout", {
      credentials:"include",
      method:"POST"
    });

    setUserInfo(null);
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
