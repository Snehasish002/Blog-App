import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((response) => {
      if (response.ok) {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      } else {
        console.error("Failed to fetch post:", response.statusText);
        // Handle the error, e.g., redirect or show an error message
      }
    }).catch(error => {
      console.error("Error fetching post:", error);
      // Handle the error, e.g., redirect or show an error message
    });
  }, [id]);

  if (!postInfo) return <div>Loading...</div>; // or an appropriate loading state

  return (
    <div className="Post-Page">
      <h1>{postInfo.title}</h1>
      <div className="author">
        by <span>{postInfo.author.username}</span>
      </div>
      <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy hh:mm aaa")}</time>
      <div className="image">
        <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
      </div>
      <div className="paragraph" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      {userInfo && userInfo.id === postInfo.author._id ? (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit Post
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </div>
      ) : (
        <div className="no-edit">
          
        </div>
      )}
    </div>
  );
};

export default PostPage;
