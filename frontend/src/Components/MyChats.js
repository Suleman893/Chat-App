import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "./Chat";

import "./MyChats.css";
import GroupModal from "./GroupModal";
const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  //For modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [loggedUser, setLoggedUser] = useState();

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
      alert("The error while fetching all chat is" + error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      <div className="my-chats">
        <div className="my-chats-container">
          <div className="my-chats-container-content">
            <p> My Chats</p>{" "}
            <button onClick={handleShow}>New group chat +</button>
          </div>

          {show && (
            <GroupModal handleShow={handleShow} show={show}/>
          )}
          {chats ? (
            chats.map((chat) => (
              <div
                className="chats-boxes"
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                style={{
                  backgroundColor: `${selectedChat}===${chat}?
                "red":"blue"
                `,
                }}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </div>
            ))
          ) : (
            <h1>loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
