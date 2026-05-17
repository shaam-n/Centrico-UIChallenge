import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import { mockApiService } from "../services/mockApi";

const Verification = ({ setStatusConfig }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 4) {
      setError("Please fill out all verification boxes.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await mockApiService.verifyOtpCode(otpCode);
      setIsLoading(false);

      setStatusConfig({
        status: "success",
        title: "SUCCESS!",
        message: "OTP Verified Successfully.",
        subMessage: "Click Continue to reset your password",
        targetRoute: "/reset-password",
      });

      // Clear navigation without pushing state
      navigate("/status-view");
    } catch (apiError) {
      setIsLoading(false);

      // Explicitly configure the failure state values via props
      setStatusConfig({
        status: "error",
        title: "OTP AUTHENTICATION FAILED",
        message: apiError.message || "Invalid verification code.",
        subMessage: "Please try again",
        targetRoute: "/reset-method",
      });

      navigate("/status-view");
    }
  };

  return (
    <AuthLayout>
      <div className='verification-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Verification Code</h2>
          <p className='auth-subtitle-center'>
            Enter the verification code that we have
            <br />
            sent to your Email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='otp-boxes-container'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='text'
                className={`otp-digit-box ${error ? "input-border-error" : ""}`}
                value={digit}
                disabled={isLoading}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
              />
            ))}
          </div>

          {error && (
            <p className='error-text-message' style={{ textAlign: "center" }}>
              {error}
            </p>
          )}

          <div className='button-center-wrapper' style={{ marginTop: "48px" }}>
            <button
              type='submit'
              className='custom-btn'
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Verifying..." : "Continue"}
            </button>
          </div>

          <div className='text-center' style={{ marginTop: "32px" }}>
            <a href='#resend' className='resend-code-link'>
              Resend Code
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Verification;
