import React, { useEffect } from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <>
      <Login />
      <Signup />
    </>
  );
};

export default HomePage;
