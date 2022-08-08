import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/ChatComponent/SideDrawer";
import MyChats from "../Components/ChatComponent/MyChats";
import ChatBox from "../Components/ChatComponent/ChatBox";
import Header from "../Components/Layout/Header";
import { useState } from "react";
import Footer from "../Components/Layout/Footer";
import "./ChatPage.css";
import React from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <React.Fragment>
      {user && <Header />}
      <div className="chatpage-container">
        {user && <SideDrawer />}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ChatPage;
