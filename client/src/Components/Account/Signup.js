import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import account from "../../assets/account.png";
import Bounce from "react-reveal/Bounce";
import "./Signup.css";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

const Signup = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Please Fill All Fields",
      });
      setLoading(false);
      return;
    }
    if (name.length < 5 || name.length > 15) {
      Toast.fire({
        icon: "error",
        title: "Name should be greater than 5 and less than 15 character",
      });
      setLoading(false);
      return;
    }
    if (password.length < 8 || password.length > 20) {
      Toast.fire({
        icon: "error",
        title: "Password should be greater than 8 and less than 20 character",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Password Dont Match",
      });
      setLoading(false);
      return;
    }
    if (!previewSource) {
      Toast.fire({
        icon: "error",
        title: "Please select image",
      });
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
        "/api/user",
        { name, email, password, previewSource },
        config
      );
      if (data) {
        Toast.fire({
          icon: "success",
          title: "User Registered Successfully",
        });
      }
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      setLoading(false);
      console.log("The error", error);
      Toast.fire({
        icon: "error",
        title: "Sorry Error Occured While Signup",
      });
    }
  };

  return (
    <div className="signupbox">
      {loading ? (
        <AppSpinner />
      ) : (
        <Bounce>
          <img
            src={previewSource ? previewSource : account}
            alt="signup"
            className="avatar"
          />
          <h1>Signup Here</h1>
          <form>
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
              type={showPass ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span>
              {!showPass ? (
                <BsEyeFill
                  onClick={() => setShowPass(!showPass)}
                  className="signup-password-hide-show"
                />
              ) : (
                <BsEyeSlashFill
                  onClick={() => setShowPass(!showPass)}
                  className="signup-password-hide-show"
                />
              )}
            </span>

            <p>Confirm Password</p>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter the confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <span>
              {!showPass ? (
                <BsEyeFill
                  onClick={() => setShowPass(!showPass)}
                  className="signup-password-hide-show"
                />
              ) : (
                <BsEyeSlashFill
                  onClick={() => setShowPass(!showPass)}
                  className="signup-password-hide-show"
                />
              )}
            </span>

            <input
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              accept="image/*"
            />
          </form>
          <button onClick={submitHandler}>Signup</button>
          <Link to="/">Already have an account? </Link>
        </Bounce>
      )}
    </div>
  );
};

export default Signup;
