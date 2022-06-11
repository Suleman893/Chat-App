import React from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
const Header = () => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return (
    <div className="header-container">
      <h1>Chat App</h1>
      <p>Bell icon</p>
      <button onClick={logoutHandler}>Logout</button>
      <select name="userinfo">
        <option>My Profile</option>
        <option>Logout</option>
      </select>
    </div>
  );
};

export default Header;
