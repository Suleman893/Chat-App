import React from "react";
import { AiFillDelete } from "react-icons/ai";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{user.name}</p>
      <AiFillDelete style={{ color: "red" }} onClick={handleFunction} />
    </div>
  );
};

export default UserBadgeItem;
