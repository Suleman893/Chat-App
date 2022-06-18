import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSenderFull, getSender } from "./Chat";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { BiArrowBack } from "react-icons/bi";
import { CgUserlane } from "react-icons/cg";
import ProfileModal from "./ProfileModal";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [show, setShow] = useState(false);
  const handleProfileModal = () => setShow(!show);
  const { user, selectedChat, setSelectedChat } = ChatState();
  

  return (
    <div>
      {selectedChat ? (
        <div>
          <BiArrowBack onClick={() => setSelectedChat("")} />
          {!selectedChat.isGroupChat ? (
            <div>
              {getSender(user, selectedChat.users)}
              <CgUserlane onClick={handleProfileModal} />
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
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Click on user to start chat</p>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
