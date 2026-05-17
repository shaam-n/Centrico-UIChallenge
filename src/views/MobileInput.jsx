import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import { mockApiService } from "../services/mockApi";

const MobileInput = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Restrict everything except numbers
    const numericValue = value.replace(/\D/g, "");

    // Don't allow typing past 10 digits
    if (numericValue.length <= 10) {
      setMobileNumber(numericValue);
      if (error) setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //mobile no validation
    if (!mobileNumber) {
      setError("Phone number is required.");
      return;
    } else if (mobileNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const fullPhoneNumber = `${countryCode}${mobileNumber}`;
      const response = await mockApiService.startMobileAuth(fullPhoneNumber);
      console.log("Mobile API Init Response:", response);

      setIsLoading(false);
      navigate("/verify-mobile", {
        state: { authRequestId: response.authRequestId },
      });
    } catch (apiError) {
      setIsLoading(false);
      setError(apiError.message);
    }
  };

  return (
    <AuthLayout>
      <div className='mobile-input-view'>
        <div className='text-center-header'>
          <h2 className='auth-title-center'>Reset Password</h2>
          <p className='auth-subtitle-center'>
            Enter your phone number, we will send a verification
            <br />
            code to your mobile
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            {/* Country Code Dropdown with 10-Digit field */}
            <div className='phone-input-container'>
              <div className='phone-prefix-addon'>
                <span>📞</span>
                <select
                  className='country-code-select'
                  value={countryCode}
                  disabled={isLoading}
                  onChange={(e) => setCountryCode(e.target.value)}>
                  <option value='+91'>+91 (IN)</option>
                  <option value='+1'>+1 (US)</option>
                  <option value='+44'>+44 (UK)</option>
                  <option value='+971'>+971 (UAE)</option>
                </select>
              </div>
              <input
                type='tel'
                className={`custom-input phone-input-field ${error ? "input-border-error" : ""}`}
                placeholder='Enter 10 digit number'
                value={mobileNumber}
                disabled={isLoading}
                onChange={handleInputChange}
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

export default MobileInput;
