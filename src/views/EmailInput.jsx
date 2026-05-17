import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import { mockApiService } from "../services/mockApi";
import MailIcon from "../assests/mail-x.png";

const EmailInput = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email address is required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      //  Promise-based service call
      const response = await mockApiService.sendEmailOtp(email);
      console.log("API Success Response:", response);

      setIsLoading(false);
      navigate("/verify-otp", { state: { target: email } });
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError.message);
    }
  };

  return (
    <AuthLayout>
      <div className='email-input-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Reset Password</h2>
          <p className='auth-subtitle-center'>
            Enter your email, we will send a verification
            <br />
            code to your email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className='input-with-icon-wrapper'>
              <span className='input-inline-icon'>
                <img
                  src={MailIcon}
                  alt='Email Icon'
                  className='input-field-icon-img'
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                />
              </span>
              <input
                type='email'
                className={`custom-input icon-padding ${error ? "input-border-error" : ""}`}
                placeholder='Enter Your Email'
                value={email}
                disabled={isLoading}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
            {error && <span className='error-text-message'>{error}</span>}
          </div>

          <div className='button-center-wrapper' style={{ marginTop: "56px" }}>
            <button
              type='submit'
              className='custom-btn'
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default EmailInput;
