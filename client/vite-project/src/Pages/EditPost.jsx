import React, { useState } from "react";

import { Navigate } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState("");

  function updatePost(ev) {
    ev.preventDefault();
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="createpost">
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />

        <input
          type="file"
          // value={files}
          onChange={(ev) => setFiles(ev.target.files)}
        />

        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "10px" }}>Create Post</button>
      </form>
    </div>
  );
};

export default EditPost;
