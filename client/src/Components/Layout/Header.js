import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import "./Header.css";
import { TbBellRinging } from "react-icons/tb";
import { GoSignOut } from "react-icons/go";
import { NavDropdown, Nav } from "react-bootstrap";
import ProfileModal from "../Modals/ProfileModal";
import { getSender } from "../ChatComponent/Chat";
import { NotificationBadge, Effect } from "react-notification-badge";

const Header = () => {
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const handleProfileModal = () => setShow(!show);
  const handleNotification = () => setShowNotification(!showNotification);
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
          <ul>
            <li onClick={handleProfileModal} className="header-img">
              <img src={user.pic} />
              {show && (
                <ProfileModal user={user} show={show} handleProfileModal />
              )}
            </li>
            <li onClick={logoutHandler}>
              <GoSignOut className="logout-icon" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
