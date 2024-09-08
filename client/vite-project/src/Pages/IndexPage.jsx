import React, { useEffect, useState } from "react";
import Post from "../Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-app-backend-gujw.onrender.com/post").then(response => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
};

export default IndexPage;
