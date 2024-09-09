import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" }
    });

    if(response.status === 200){
      alert('Registeration successful')
    }else{
      alert('Registeration faild');
    }
  }
  return (
    <form className="Register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
