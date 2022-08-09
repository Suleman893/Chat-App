import React from "react";
import { Modal } from "react-bootstrap";
import "./ProfileModal.css";
import Zoom from "react-reveal/Zoom";

const ProfileModal = ({ user, show, handleProfileModal }) => {
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleProfileModal}>
        <Modal.Header closeButton>
          <Zoom>
            <Modal.Title>User Information</Modal.Title>
          </Zoom>
        </Modal.Header>
        <Modal.Body>
          <Zoom>
            <div className="user-profile">
              <img src={user.pic} alt="userpic" />
              <div className="user-profile-content">
                <h5>
                  <b>Name:</b> {user.name}
                </h5>
                <h5>
                  <b>Email: </b>
                  {user.email}
                </h5>
              </div>
            </div>
          </Zoom>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModal;
