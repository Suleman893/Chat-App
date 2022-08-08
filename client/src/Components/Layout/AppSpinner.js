import Spinner from "react-bootstrap/Spinner";
import "./AppSpinner.css";

const AppSpinner = () => {
  return (
    <div className="spinner-box">
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
        <Spinner
          animation="grow"
          variant="success"
          style={{ margin: "0px 3px" }}
        />
      </div>
    </div>
  );
};

export default AppSpinner;
