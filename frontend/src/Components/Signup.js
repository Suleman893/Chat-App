import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import account from "../assets/account.png";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handlePasswordShow = () => {
    setShow(!show);
  };
  // const postDetails = (pics) => {};
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      alert("Password dont match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );
      alert("User Signup successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      alert("Error occured");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="signupbox">
        <img src={account} className="avatar" />
        <h1>Signup Here</h1>
        <p>Name</p>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>Email</p>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p>Password</p>

        <input
          placeholder="Enter your password"
          type={show ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <p>Confirm Password</p>

        <input
          type={show ? "text" : "password"}
          placeholder="Enter the confirm password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {/*
      <input
        type="file"
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
      />
      */}

        <button onClick={handlePasswordShow}>{show ? "Hide" : "Show"}</button>
        <button onClick={submitHandler}>Signup</button>
        <Link to="/">Already have an account? </Link>
      </div>
    </>
  );
};

export default Signup;
