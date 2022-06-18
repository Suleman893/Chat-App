import React from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import "./Header.css";
const Header = () => {
  const { user } = ChatState();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return (
    <div className="header-container">
      <div className="first">
        <h1>Chat App</h1>
      </div>
      <div className="second">
        <button onClick={logoutHandler}>Bell Icon</button>
        <select name="userinfo">
          {/* <option>My Profile{user.name}</option> */}
          <option>My Profile</option>
          <option>Logout</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
