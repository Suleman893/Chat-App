import React from "react";
import "./ChatBox.css";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <div className="chat-box">
      <div className="chat-box-container ">
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default ChatBox;
