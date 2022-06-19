import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import "./Header.css";
import { TbBellRinging } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
// import { NavDropdown, Nav } from "react-bootstrap";
import ProfileModal from "../Modals/ProfileModal";

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
    <header>
      <div className="header-container">
        <div className="header-logo">
          <h2>Chat App</h2>
        </div>
        <div className="header-menu">
          <nav>
            <ul>
              {/* 
          <NavDropdown title="Usernmae" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
          */}
              <li className="icons-font-size">{user.name}</li>
              <li onClick={handleProfileModal}>
                <FaUser style={{ color: "blue" }} className="icons-font-size" />
                {show && (
                  <ProfileModal user={user} show={show} handleProfileModal />
                )}
              </li>
              <li>
                <TbBellRinging
                  style={{ color: "yellow" }}
                  className="icons-font-size"
                />
              </li>
              <li onClick={logoutHandler}>
                <FiLogOut
                  style={{ color: "red" }}
                  className="icons-font-size"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
