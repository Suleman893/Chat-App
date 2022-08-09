import React from "react";
import "./UserListItem.css";
import Zoom from "react-reveal/Zoom";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Zoom>
      <div className="add-users-list-container">
        <div className="add-users-list" onClick={handleFunction}>
          <div className="add-users-list-img">
            <img src={user.pic} />
          </div>
          <div className="add-users-list-content">
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
      <br />
    </Zoom>
  );
};

export default UserListItem;
