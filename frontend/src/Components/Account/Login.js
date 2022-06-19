import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";

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
      <div className="loginbox">
        <h1>Login Here</h1>
        <p>Email</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p>Password</p>
        <input
          placeholder="Enter your password"
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
        >
          Guest
        </button>
        <Link to="/signup">Dont have an account? </Link>
      </div>
    </>
  );
};

export default Login;
