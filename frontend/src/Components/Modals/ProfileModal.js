import React from "react";
import { Modal } from "react-bootstrap";
import "./ProfileModal.css";
import Zoom from "react-reveal/Zoom";

const ProfileModal = ({ user, show, handleProfileModal }) => {
  return (
    <>
      <Modal show={show} onHide={handleProfileModal}>
        <Modal.Header closeButton>
          <Zoom>
            <Modal.Title>{user.name} Info</Modal.Title>
          </Zoom>
        </Modal.Header>
        <Modal.Body>
          <Zoom>
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
          </Zoom>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
