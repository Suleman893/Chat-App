import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="userListItem">
      {/* Instead of button use div onclick*/}
      <button onClick={handleFunction}>Access </button>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <hr />
    </div>
  );
};

export default UserListItem;
