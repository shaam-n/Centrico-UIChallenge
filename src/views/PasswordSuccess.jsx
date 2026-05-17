import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import SuccessIcon from "../assests/ok.png";

const PasswordSuccess = () => {
  const navigate = useNavigate();

  const handleLoginAgain = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <AuthLayout>
      <div className='status-result-view'>
        <div className='status-graphic-container'>
          <div>
            <span>
              <img
                src={SuccessIcon}
                alt='successIcon'
                className='status-vector-img'
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </span>
          </div>
        </div>

        <div className='text-center' style={{ marginBottom: "40px" }}>
          <h2
            className='status-title text-success'
            style={{ lineHeight: "1.3" }}>
            Password Update
            <br />
            Successfully
          </h2>
          <p
            className='status-main-message'
            style={{ fontSize: "14px", color: "#7a869a", marginTop: "16px" }}>
            Password changed successfully, you can login again with
            <br />
            new password
          </p>
        </div>

        <div className='button-center-wrapper'>
          <button
            type='button'
            className='custom-btn btn-success-bg'
            onClick={handleLoginAgain}>
            Login Again
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PasswordSuccess;
