import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSenderFull, getSender } from "./Chat";
import UpdateGroupChatModal from "../Modals/UpdateGroupChatModal";
import { BiArrowBack } from "react-icons/bi";
import { CgUserlane } from "react-icons/cg";
import ProfileModal from "../Modals/ProfileModal";
import "./SingleChat.css";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";
import "./SingleChat.css";

//SocketIO EndPoints
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleProfileModal = () => setShow(!show);
  const [socketConnected, setSocketConnected] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to load messages",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
            //error2, yeh selectedChat ha sirf not ._id
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to send messages",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      {selectedChat ? (
        <React.Fragment>
          <div className="single-chat-info-section">
            <BiArrowBack
              onClick={() => setSelectedChat("")}
              style={{ cursor: "pointer" }}
            />
            {!selectedChat.isGroupChat ? (
              <div>
                {getSender(user, selectedChat.users)}
                <CgUserlane
                  onClick={handleProfileModal}
                  style={{ cursor: "pointer" }}
                />
                {show && (
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                    show={show}
                    handleProfileModal={handleProfileModal}
                  />
                )}
              </div>
            ) : (
              <div>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </div>
            )}
          </div>
          {loading ? (
            <AppSpinner />
          ) : (
            <div className="chat-bg">
              <ScrollableChat messages={messages} />
            </div>
          )}
          <div
            onKeyDown={sendMessage}
            tabIndex="0"
            className="single-chat-type"
          >
            <input
              placeholder="Enter a message..."
              value={newMessage}
              onChange={typingHandler}
            ></input>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="not-selected-message">
            <p>Select chat to start conversation</p>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SingleChat;
