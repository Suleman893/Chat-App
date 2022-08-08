import React from "react";
import { AiFillDelete } from "react-icons/ai";
import "./UserBadgeItem.css";
import { Badge } from "react-bootstrap";
import Zoom from "react-reveal/Zoom";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Zoom>
      <div className="user-badge">
        <Badge bg="success">
          {user.name}{" "}
          <AiFillDelete
            style={{ color: "#ff0000" }}
            className="badge-icon-font-size"
            onClick={handleFunction}
          />
        </Badge>
      </div>
    </Zoom>
  );
};

export default UserBadgeItem;
