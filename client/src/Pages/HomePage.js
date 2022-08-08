import React, { useEffect } from "react";
import Login from "../Components/Account/Login";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (user) history.push("/chats");
  }, [history, user]);

  return <Login />;
};

export default HomePage;
