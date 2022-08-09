import React from "react";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "../UserListItem";
import Swal from "sweetalert2";
import Zoom from "react-reveal/Zoom";
import { AiFillDelete } from "react-icons/ai";
import "./UpdateGroupChatModal.css";

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  fetchMessages,
  showGroupModal,
  handleGroupModal,
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      Toast.fire({
        icon: "error",
        title: "User already added",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      Toast.fire({
        icon: "error",
        title: "Only admins can add someone",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error while adding user",
      });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error Occured While Update",
      });
    }
    setGroupChatName("");
  };
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      Toast.fire({
        icon: "error",
        title: "Only admins can remove someone",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Error occured while removing",
      });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
        title: "Error occured while searching",
      });
    }
  };

  return (
    <React.Fragment>
      <Modal centered show={showGroupModal} onHide={handleGroupModal}>
        <Modal.Header closeButton>
          <Modal.Title>Group Name: {selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="update-group-users">
            {selectedChat.users.map((u) => (
              <div className="update-user-box" key={u._id}>
                <p>{u.name}</p>
                <AiFillDelete
                  onClick={() => handleRemove(u)}
                  style={{ color: "#D22B2B", fontSize: "18px" }}
                />
              </div>
            ))}
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Update Group</Form.Label>
              <Form.Control
                placeholder="Rename group"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Form.Label>Add User to Group</Form.Label>
              <Form.Control
                placeholder="Add User to Group"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
          {searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleAddUser(user)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleGroupModal}>Cancel</button>
          <button onClick={handleRename}>Rename Group</button>
          <button onClick={() => handleRemove(user)}>Leave Group</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default UpdateGroupChatModal;
