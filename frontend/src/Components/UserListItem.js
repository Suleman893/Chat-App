import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="userListItem" onClick={handleFunction}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <hr />
    </div>
  );
};

export default UserListItem;
