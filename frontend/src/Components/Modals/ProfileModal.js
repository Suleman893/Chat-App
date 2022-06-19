import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
const ProfileModal = ({ user, show, handleProfileModal }) => {
  return (
    <>
      <Modal show={show} onHide={handleProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={user.pic} alt="userpic" />
          <p>{user.email}</p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
