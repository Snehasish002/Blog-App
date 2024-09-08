import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {UserContext} from "../UserContext";
import { Link } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://blog-app-backend-gujw.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <div className="Post-Page">
      <h1>{postInfo.title}</h1>
      <div className="author">
        by <span>{postInfo.author.username}</span>
      </div>
      
      <time>{format(new Date(postInfo.createdAt), "MMM d, yyyy hh:mm aaa")}</time>
      
      <div className="image">
        <img src={`https://blog-app-backend-gujw.onrender.com/${postInfo.cover}`} alt="" />
      </div>
      <div className="paragraph" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
          
            Edit Post
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostPage;

