import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import SuccessIcon from "../assests/Success.png";
import ErrorIcon from "../assests/x-circle.png";

// Component parameters are passed dynamically
const StatusResult = ({ status, title, message, subMessage, targetRoute }) => {
  const navigate = useNavigate();

  const handleActionClick = (e) => {
    e.preventDefault();
    navigate(targetRoute || "/login");
  };

  return (
    <AuthLayout>
      <div className='status-result-view'>
        <div className='status-graphic-container'>
          {status === "success" ? (
            <div className='status-circle-frame circle-success'>
              <div className='success-checkmark-vector'>
                <img
                  src={SuccessIcon}
                  alt='Success'
                  className='status-vector-img'
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='status-circle-frame circle-error'>
              <div className='error-cross-vector'>
                <img
                  src={ErrorIcon}
                  alt='Error'
                  className='status-vector-img'
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className='text-center' style={{ marginBottom: "40px" }}>
          <h2
            className={`status-title ${status === "error" ? "text-error" : "text-success"}`}>
            {title}
          </h2>
          <p className='status-main-message'>{message}</p>
          {subMessage && <p className='status-sub-message'>{subMessage}</p>}
        </div>

        <div className='button-center-wrapper'>
          <button
            type='button'
            className={`custom-btn ${status === "error" ? "btn-danger-bg" : "btn-success-bg"}`}
            onClick={handleActionClick}>
            {status === "success" ? "Continue" : "Try Again"}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default StatusResult;
