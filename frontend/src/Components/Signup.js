import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
      <input
        placeholder="Enter your name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="Enter your password"
        type={show ? "text" : "password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handlePasswordShow}>{show ? "Hide" : "Show"}</button>
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
      <button onClick={submitHandler}>Signup</button>
    </>
  );
};

export default Signup;
