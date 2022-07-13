import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import UserListItem from "../UserListItem";
import UserBadgeItem from "../UserBadgeItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import "./GroupModal.css";
import Zoom from "react-reveal/Zoom";
import Swal from "sweetalert2";

const GroupModal = ({ handleShow, show }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const { user, chats, setChats } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      Toast.fire({
        icon: "error",
        title: "User already added",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
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
        title: "Error while fetching",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      Toast.fire({
        icon: "error",
        title: "Please fill all the flieds",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      Toast.fire({
        icon: "success",
        title: "New Group Created",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error while creating new group",
      });
    }
  };

  const handleClose = () => handleShow(!show);

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Zoom>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Chat Name</Form.Label>
                <Form.Control
                  placeholder="Chatname"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                placeholder="Add Users"
                onChange={(e) => handleSearch(e.target.value)}
              >
                <Form.Label>Add Users</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Zoom>
          {selectedUsers?.map((u) => (
            <div className="user-bagde-items">
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            </div>
          ))}
          {searchResult?.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancel</button>
          <button variant="primary" onClick={handleSubmit}>
            Create Group
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroupModal;
