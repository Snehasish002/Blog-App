import React, { useState } from "react";


import {Navigate} from 'react-router-dom';
import Editor from "../Editor";



const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();

    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: 'include'
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="createpost">
      <form onSubmit={createNewPost}>
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

        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "10px" }}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
