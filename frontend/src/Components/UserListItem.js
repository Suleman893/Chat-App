import React from "react";
import "./UserListItem.css";

const UserListItem = ({ user, handleFunction }) => {
  return (
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
  );
};

export default UserListItem;
