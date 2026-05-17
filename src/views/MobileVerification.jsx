import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import { mockApiService } from "../services/mockApi";

const MobileVerification = ({ setStatusConfig }) => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2-minute timeout rule

  const countdownTimerRef = useRef(null);

  // 2-Minute Visual Countdown
  useEffect(() => {
    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownTimerRef.current);

          setStatusConfig({
            status: "error",
            title: "ERROR!",
            message: "Mobile Authorization Timed Out",
            subMessage: "Please try again",
            targetRoute: "/reset-method",
          });

          navigate("/status-view");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimerRef.current);
  }, [navigate, setStatusConfig]);

  const handlePinChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ""); // remove non-numbers
    if (numericValue.length <= 1) {
      setPin(numericValue);
      if (error) setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pin) {
      setError("Please enter the verification number shown on your device.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await mockApiService.verifyMobilePin(pin);
      console.log("Mobile API Success Response:", response);

      clearInterval(countdownTimerRef.current);
      setIsLoading(false);

      setStatusConfig({
        status: "success",
        title: "SUCCESS!",
        message: "OTP Verified Successfully",
        subMessage: "Click Continue to reset your password",
        targetRoute: "/reset-password",
      });

      navigate("/status-view");
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError.message);

      setTimeout(() => {
        setStatusConfig({
          status: "error",
          title: "ERROR!",
          message: "OTP Authentication Failed",
          subMessage: apiError.message,
          targetRoute: "/reset-method",
        });

        navigate("/status-view");
      }, 1500);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <AuthLayout>
      <div className='mobile-verification-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Approve Password Reset Request</h2>
          <p className='auth-subtitle-center'>
            Open Your Mobile And Enter the
            <br />
            Number Shown to Reset
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='security-number-container'>
            <input
              type='text'
              className={`otp-digit-box ${error ? "input-border-error" : ""}`}
              value={pin}
              disabled={isLoading}
              onChange={handlePinChange}
              maxLength={1}
              placeholder='-'
              style={{ fontSize: "24px", fontWeight: "600" }}
            />
          </div>

          {error && (
            <p
              className='error-text-message'
              style={{ textAlign: "center", marginBottom: "16px" }}>
              {error}
            </p>
          )}

          <div className='polling-countdown-feedback text-center'>
            <p className='countdown-clock-text'>
              Time remaining: <strong>{formatTime(timeLeft)}</strong>
            </p>
          </div>

          <div className='text-center' style={{ marginTop: "24px" }}>
            <a
              href='#resend'
              onClick={(e) => {
                e.preventDefault();
                setTimeLeft(120);
              }}
              className='resend-code-link'>
              Resend Code
            </a>
          </div>

          <div className='button-center-wrapper' style={{ marginTop: "40px" }}>
            <button
              type='submit'
              className='custom-btn'
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Checking..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default MobileVerification;
