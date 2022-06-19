import React from "react";
import { AiFillDelete } from "react-icons/ai";
import "./UserBadgeItem.css";
import { Badge } from "react-bootstrap";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div className="user-badge">
      <Badge bg="success">
        {user.name}{" "}
        <AiFillDelete
          style={{ color: "red" }}
          className="badge-icon-font-size"
          onClick={handleFunction}
        />
      </Badge>
    </div>
  );
};

export default UserBadgeItem;
