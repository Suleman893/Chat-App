import React from "react";
import "./ChatBox.css";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
import Bounce from "react-reveal/Bounce";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Bounce>
      <div className="chat-box">
        <div className="chat-box-container ">
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div>
    </Bounce>
  );
};

export default ChatBox;
