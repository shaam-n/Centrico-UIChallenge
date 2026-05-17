import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";

const PasswordFailure = () => {
  const navigate = useNavigate();

  const handleTryAgain = (e) => {
    e.preventDefault();
    navigate("/reset-method");
  };

  return (
    <AuthLayout>
      <div className='status-result-view'>
        <div className='status-graphic-container'>
          <div className='sad-face-icon-wrapper'>☹</div>
        </div>

        <div className='text-center' style={{ marginBottom: "40px" }}>
          <h2
            className='status-title text-error'
            style={{ fontWeight: "600", fontSize: "22px" }}>
            ERROR!
          </h2>
          <p
            className='status-main-message'
            style={{ fontWeight: "600", color: "#333333", marginTop: "20px" }}>
            Password Update
            <br />
            Failure
          </p>
          <p
            className='status-sub-message'
            style={{ fontSize: "14px", color: "#7a869a", marginTop: "16px" }}>
            Please try again to complete the request.
          </p>
        </div>

        <div className='button-center-wrapper'>
          <button
            type='button'
            className='custom-btn btn-danger-bg'
            onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordFailure;
