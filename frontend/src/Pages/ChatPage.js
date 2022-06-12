import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import Header from "../Components/Header";
import "./ChatPage.css";
const ChatPage = () => {
  const { user } = ChatState();
  return (
    <>
      <Header />
      <div className="chatpage-container">
        {user && <SideDrawer />}
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </>
  );
};

export default ChatPage;
