import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditPost = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
   
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          
        })
      })
  },[]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if(files?.[0]){
      data.set("file", files?.[0]);
    }
    
    await fetch("http://localhost:3000/post", {
      method: "PUT",
      body: data,

    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} />;
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
        <button className="update-post" style={{ marginTop: "10px" }}>Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
