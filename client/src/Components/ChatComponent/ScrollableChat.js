import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "../ChatComponent/Chat";
import { ChatState } from "../../context/ChatProvider";
import "./ScrollableChat.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages.length ? (
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img src={m.sender.pic} className="sender-pic" alt="userpic" />
            )}
            <span
              className="one-message-style"
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#99ccff" : "#b9f5d0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
              }}
            >
              {m.content}
            </span>
          </div>
        ))
      ) : (
        <div className="no-message">
          <p>No Conversation, send message to start</p>
        </div>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
