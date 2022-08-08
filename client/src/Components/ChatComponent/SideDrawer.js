import React, { useState } from "react";
import axios from "axios";
import UserListItem from "../UserListItem";
import "./SideDrawer.css";
import { RiUserSearchFill } from "react-icons/ri";

import Bounce from "react-reveal/Bounce";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";
import { ChatState } from "../../context/ChatProvider";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { loading, setLoading } = useState(false);

  // const { loadingChat, setLoadingChat } = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const handleSearch = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    if (!search) {
      Toast.fire({
        icon: "error",
        title: "Enter Something to Search",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to search",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
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
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error while fetching the chat",
      });
    }
  };

  return (
    <React.Fragment>
      <Bounce>
        <div className="side-drawer">
          <div className="user-search-section">
            <input
              placeholder="Search User ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <RiUserSearchFill
              onClick={handleSearch}
              className="user-search-icon"
            />
          </div>
          {loading ? (
            <AppSpinner />
          ) : (
            <React.Fragment>
              {searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))}
            </React.Fragment>
          )}
        </div>
      </Bounce>
    </React.Fragment>
  );
};

export default SideDrawer;
