import React from "react";

import { format } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1725181959662-af4acf689235?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt),'MMM d, yyyy hh:mm aaa')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
