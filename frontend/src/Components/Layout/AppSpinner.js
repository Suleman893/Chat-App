import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./AppSpinner.css";

const AppSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner
        animation="grow"
        variant="success"
        style={{ margin: "0px 3px" }}
      />
      <Spinner
        animation="grow"
        variant="success"
        style={{ margin: "0px 3px" }}
      />
      <Spinner
        animation="grow"
        variant="success"
        style={{ margin: "0px 3px" }}
      />
    </div>
  );
};

export default AppSpinner;
