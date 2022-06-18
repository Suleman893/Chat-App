import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import Header from "../Components/Header";
import { useState } from "react";
import "./ChatPage.css";
const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      {user && <Header />}
      <div className="chatpage-container">
        {user && <SideDrawer />}
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </>
  );
};

export default ChatPage;
