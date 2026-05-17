import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import { mockApiService } from "../services/mockApi";
import LockIcon from "../assests/lock.png";

// Configuration Setter Prop
const ResetPassword = ({ setStatusConfig }) => {
  const navigate = useNavigate();

  // Form states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Form Validation
    if (!password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      //Promise call to mock service
      await mockApiService.submitNewPassword(password);
      setIsLoading(false);

      navigate("/password-success");
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError.message);

      setTimeout(() => {
        navigate("/password-error");
      }, 1000);
    }
  };

  return (
    <AuthLayout>
      <div className='reset-password-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Create New Password</h2>
          <p className='auth-subtitle-center'>
            Your password must be different from
            <br />
            previous used password
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className='input-with-icon-wrapper'>
              <span className='input-inline-icon default-lock-color'>
                <img
                  src={LockIcon}
                  alt='lock'
                  className='status-vector-img'
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`custom-input icon-padding right-icon-padding ${error ? "input-border-error" : ""}`}
                placeholder='New Password'
                value={password}
                disabled={isLoading}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              {/* New Password Visibility Toggle */}
              <button
                type='button'
                className='input-visibility-toggle-btn'
                onClick={() => setShowPassword(!showPassword)}
                tabIndex='-1'
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='eye-svg-icon'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='eye-svg-icon'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.391 4.178 5.326 7.178 9.963 7.178 2.112 0 4.093-.614 5.76-1.683M21.246 12.322A10.454 10.454 0 0 0 12 4.5c-1.214 0-2.38.206-3.468.587M8.212 8.212a3 3 0 0 0 4.242 4.242M3.75 3.75l16.5 16.5'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password field block */}
          <div className='form-group' style={{ marginTop: "24px" }}>
            <div className='input-with-icon-wrapper'>
              <span className='input-inline-icon muted-lock-color'>
                <img
                  src={LockIcon}
                  alt='lock'
                  className='status-vector-img'
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`custom-input icon-padding right-icon-padding ${error ? "input-border-error" : ""}`}
                placeholder='Confirm password'
                value={confirmPassword}
                disabled={isLoading}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <button
                type='button'
                className='input-visibility-toggle-btn'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex='-1'
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }>
                {showConfirmPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='eye-svg-icon'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='eye-svg-icon'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.391 4.178 5.326 7.178 9.963 7.178 2.112 0 4.093-.614 5.76-1.683M21.246 12.322A10.454 10.454 0 0 0 12 4.5c-1.214 0-2.38.206-3.468.587M8.212 8.212a3 3 0 0 0 4.242 4.242M3.75 3.75l16.5 16.5'
                    />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <span
                className='error-text-message'
                style={{ marginTop: "12px", display: "block" }}>
                {error}
              </span>
            )}
          </div>

          <div className='button-center-wrapper' style={{ marginTop: "56px" }}>
            <button
              type='submit'
              className='custom-btn'
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
