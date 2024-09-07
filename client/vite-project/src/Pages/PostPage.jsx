import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
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
    </div>
  );
};

export default PostPage;

