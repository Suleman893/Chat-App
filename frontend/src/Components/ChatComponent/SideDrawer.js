import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserListItem";
import "./SideDrawer.css";
import { RiUserSearchLine } from "react-icons/ri";
import Bounce from "react-reveal/Bounce";
import AppSpinner from "../Layout/AppSpinner";
import Swal from "sweetalert2";

const SideDrawer = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { loading, setLoading } = useState(false);
  // const { loadingChat, setLoadingChat } = useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();

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
    <>
      <Bounce>
        <div className="side-drawer">
          <div className="side-drawer-container">
            <input
              placeholder="Enter user name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <RiUserSearchLine
                onClick={handleSearch}
                className="search-icon"
              />
            </div>
            {loading ? (
              <AppSpinner />
            ) : (
              <>
                <p>
                  {searchResult?.map((user) => (
                    <div className="div-flexer">
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    </div>
                  ))}
                </p>
              </>
            )}
          </div>
        </div>
      </Bounce>
    </>
  );
};

export default SideDrawer;
