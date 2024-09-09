import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"https://blog-app-backend-f8mc.onrender.com/" + cover} alt="" />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy hh:mm aaa")}</time>
        </p>
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`}>
          <button className="see-post">See post</button>
        </Link>
      </div>
    </div>
  );
};

export default Post;
