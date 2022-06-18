import React from "react";
import "./UserListItem.css";
const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="userListItem" onClick={handleFunction}>
      <img src={user.pic} />
      <div className="userListItemContent">
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
      <hr />
    </div>
  );
};

export default UserListItem;
