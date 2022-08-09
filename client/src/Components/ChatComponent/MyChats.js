import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "./Chat";
import GroupModal from "../Modals/GroupModal";
import Bounce from "react-reveal/Bounce";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import "./MyChats.css";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [loggedUser, setLoggedUser] = useState();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error while fetching all chats",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <React.Fragment>
      <Bounce>
        <div className="my-chats">
          <div className="my-chats-container">
            <div className="my-chats-title-section">
              <p> My Chats</p>{" "}
              <AiOutlineUsergroupAdd
                style={{
                  fontSize: "28px",
                  color: "#00b712",
                  cursor: "pointer",
                }}
                onClick={handleShow}
              />
            </div>
            {show && <GroupModal handleShow={handleShow} show={show} />}
            {chats ? (
              <div className="chat-boxes-container">
                {chats.map((chat) => (
                  <div
                    className="chats-boxes"
                    onClick={() => setSelectedChat(chat)}
                    key={chat._id}
                    style={{
                      backgroundColor: selectedChat == chat && "#04b0ff",
                      boxShadow:
                        selectedChat == chat && "0px 0px 1px 0px #04b0ff",
                    }}
                  >
                    <p>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <AppSpinner />
            )}
          </div>
        </div>
      </Bounce>
    </React.Fragment>
  );
};

export default MyChats;
