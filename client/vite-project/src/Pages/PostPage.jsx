import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {UserContext} from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`).then((response) => {
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
        <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
      </div>
      <div className="paragraph" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <a className="edit-btn" href="">
          
            Edit Post
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default PostPage;

