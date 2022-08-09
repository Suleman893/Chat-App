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
            {/*<li className="icons-font-size">{user.name}</li>
             */}
            <li onClick={handleProfileModal}>
              <div className="header-img">
                <img src={user.pic} />
                {show && (
                  <ProfileModal user={user} show={show} handleProfileModal />
                )}
              </div>
            </li>
            {/*
            <li>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
              <TbBellRinging
                onClick={handleNotification}
                style={{ color: "yellow" }}
                className="icons-font-size"
              />
              {showNotification && (
                <NavDropdown>
                  {!notification.length && "No New Message"}
                  {notification.map((n) => (
                    <NavDropdown.Item
                      href="#action/3.3"
                      key={n._id}
                      onClick={() => {
                        setSelectedChat(n.chat);
                        setNotification(
                          notification.filter((noti) => noti !== n)
                        );
                      }}
                    >
                      {n.chat.isGroupChat
                        ? `New Message in ${n.chat.chatName}`
                        : `
                        New Message from ${getSender(user, n.chat.users)}
                        `}
                    </NavDropdown.Item>
                  ))}
                  <NavDropdown.Divider />
                </NavDropdown>
              )}
            </li>
            */}
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
