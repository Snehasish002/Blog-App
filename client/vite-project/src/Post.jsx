import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1725181959662-af4acf689235?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      <div className="texts">
        <h2>Full-house battery backup coming later this year</h2>
        <p className="info">
          <a className="author">Snehasish Mohanty</a>
          <time>2024-08-01 16:45</time>
        </p>
        <p className="summary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo deserunt
          aliquam pariatur soluta? Mollitia tempore voluptates esse eaque quod
          ea voluptatum obcaecati. Sapiente ipsa accusamus adipisci. Dolore
          ratione veritatis quis.
        </p>
      </div>
    </div>
  );
};

export default Post;