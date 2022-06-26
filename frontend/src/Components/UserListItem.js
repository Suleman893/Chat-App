import React from "react";
import "./UserListItem.css";
import Zoom from "react-reveal/Zoom";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Zoom>
      <div className="user-lists-container">
        <div className="users-list" onClick={handleFunction}>
          <img src={user.pic} />
          <div className="users-list-content">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <hr />
        </div>
      </div>
    </Zoom>
  );
};

export default UserListItem;
