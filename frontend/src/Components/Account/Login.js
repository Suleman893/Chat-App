import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Bounce from "react-reveal/Bounce";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";

const Login = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

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
      Toast.fire({
        icon: "error",
        title: "Please Fill All Fields",
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
        "/api/user/login",
        { email, password },
        config
      );
      if (data) {
        Toast.fire({
          icon: "success",
          title: "Signup Successfully",
        });
      }
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: "Sorry Error Occured While Login",
      });
    }
  };

  return (
    <div className="loginbox">
      {loading ? (
        <AppSpinner />
      ) : (
        <Bounce>
          <form>
            {" "}
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
            <button onClick={handlePasswordShow}>
              {show ? "Hide" : "Show"}
            </button>
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
          </form>
        </Bounce>
      )}
    </div>
  );
};

export default Login;
