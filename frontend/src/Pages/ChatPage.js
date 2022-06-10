import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    console.log("the data", data);
  };
  return (
    <div>
      {chats.map((curr) => (
        <div key={curr._id}>{curr.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
