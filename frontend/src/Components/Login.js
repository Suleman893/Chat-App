import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordShow = () => {
    setShow(!show);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      alert("Login done successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      alert("Error occured");
      setLoading(false);
    }
  };
  return (
    <>
      <input
        placeholder="Enter your name"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="Enter your name"
        value={password}
        type={show ? "text" : "password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handlePasswordShow}>{show ? "Hide" : "Show"}</button>
      <button onClick={submitHandler}>Login</button>
      <button
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      ></button>
      <br />
      <br />
      <br />
    </>
  );
};

export default Login;
