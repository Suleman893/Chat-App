import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "./ChatPage.css";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/ChatComponent/SideDrawer";
import MyChats from "../components/ChatComponent/MyChats";
import ChatBox from "../components/ChatComponent/ChatBox";

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
