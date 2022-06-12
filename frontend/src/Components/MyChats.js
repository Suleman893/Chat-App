import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "./Chat";
import "./MyChats.css";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

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
  }, []);
  return (
    <>
      <div className="my-chats">
        <div className="my-chats-container">
          <div className="my-chats-container-content">
            <p> My Chats</p> <button>New group chat +</button>
          </div>
          {chats ? (
            chats.map((chat) => (
              <div
                className="chats-boxes"
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
              >
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
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
