import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";

const MethodSelect = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedMethod === "email") {
      navigate("/reset-email");
    } else if (selectedMethod === "mobile") {
      navigate("/reset-mobile");
    }
  };

  return (
    <AuthLayout>
      <div className='method-select-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Forgot Password</h2>
          <p className='auth-subtitle-center'>
            Select with contact details should we use
            <br />
            to reset yout password
          </p>
        </div>

        <form onSubmit={handleContinue}>
          <div className='method-options-container'>
            <div
              className={`method-option-card ${selectedMethod === "email" ? "active" : ""}`}
              onClick={() => setSelectedMethod("email")}>
              <div className='method-icon-wrapper email-bg'>✉️</div>
              <div className='method-text-details'>
                <span className='method-label-title'>Email</span>
                <span className='method-masked-value'>********@mail.com</span>
              </div>
            </div>

            <div
              className={`method-option-card ${selectedMethod === "mobile" ? "active" : ""}`}
              onClick={() => setSelectedMethod("mobile")}>
              <div className='method-icon-wrapper phone-bg'>📞</div>
              <div className='method-text-details'>
                <span className='method-label-title'>Phone Number</span>
                <span className='method-masked-value'>**** **** **** 2345</span>
              </div>
            </div>
          </div>

          <div className='button-center-wrapper'>
            <button
              type='submit'
              className='custom-btn'
              disabled={!selectedMethod}
              style={{ opacity: selectedMethod ? 1 : 0.6 }}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default MethodSelect;
