import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ProfileModal.css";
const ProfileModal = ({ user, show, handleProfileModal }) => {
  console.log("The user", user);
  return (
    <>
      <Modal show={show} onHide={handleProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name} Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="user-profile">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
              alt="userpic"
            />
            <div className="user-profile-content">
            <h3>{user.name}</h3>
            <h5>{user.email}</h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
