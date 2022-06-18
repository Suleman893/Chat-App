import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import "./Header.css";
import { TbBellRinging } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { NavDropdown, Nav } from "react-bootstrap";
import ProfileModal from "./ProfileModal";
const Header = () => {
  const { user } = ChatState();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleProfileModal = () => setShow(!show);
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return (
    <div className="header-container">
      <div className="first">
        <h2>Chat App</h2>
      </div>
      <div className="second">
        <ul>
          {/* 
          <NavDropdown title="Usernmae" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          */}
          <li onClick={handleProfileModal}>
            {user.name}
            {show && <ProfileModal user={user} show={show} 
   handleProfileModal={handleProfileModal}
            
            />}
          </li>
          <li>
            <FaUser />
          </li>
          <li>
            <TbBellRinging style={{ color: "red", fontSize: "20px" }} />
          </li>
          <li onClick={logoutHandler}>
            <FiLogOut style={{ color: "red", fontSize: "20px" }} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
