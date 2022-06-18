import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import UserListItem from "./UserListItem";
import "./SideDrawer.css";
import { RiUserSearchLine } from "react-icons/ri";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { loading, setLoading } = useState(false);
  const { loadingChat, setLoadingChat } = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      alert("Enter something to search");
      return;
    }
    try {
      // setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to search");
    }
  };

  const accessChat = async (userId) => {
    try {
      // setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      // setLoadingChat(false);
      // onClose();
    } catch (error) {
      alert("The error while fetching the chat ");
    }
  };
  return (
    <>
      <div className="side-drawer">
        <div className="side-drawer-container">
          <input
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <RiUserSearchLine
            onClick={handleSearch}
            style={{ color: "red", fontSize: "20px" }}
          />
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <>
              <p>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
