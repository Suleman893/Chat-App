import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import UserListItem from "./UserListItem";
const SideDrawer = () => {
  const { user, setSelectedChat, chat, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { loading, setLoading } = useState(false);
  const { loadingChat, setLoadingChat } = useState();

  const handleSearch = async () => {
    if (!search) {
      alert("Enter something to search");
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
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat",
        {
          userId,
        },
        config
      );

      setSelectedChat(data);
      setLoadingChat(false);
      onclose();
    } catch (error) {
      alert("The error while accessing chat ");
    }
  };
  return (
    <>
      <div className="flex-basis-18">
        <input
          placeholder="search chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search </button>
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
    </>
  );
};

export default SideDrawer;
