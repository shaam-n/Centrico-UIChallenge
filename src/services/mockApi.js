const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  /**
   * sending an email OTP request
   */
  sendEmailOtp: async (email) => {
    await delay(1000);
    if (email.toLowerCase() === "error@mail.com") {
      throw new Error("This email is not registered in our system.");
    }
    return { success: true, message: "OTP sent successfully to " + email };
  },

  /**
   * verification of a 4-digit OTP code
   */
  verifyOtpCode: async (otpCode) => {
    await delay(1000);
    // Hardcoded rule: '1234' succeeds, everything else fails
    if (otpCode === "1234") {
      return { success: true, token: "mock-jwt-token-abcd" };
    }
    throw new Error("Invalid verification code. Please check and try again.");
  },

  /**
   * initiating a mobile authentication flow
   */
  startMobileAuth: async (mobileNumber) => {
    await delay(1000);
    if (mobileNumber.includes("00000")) {
      throw new Error("Invalid mobile number format or network error.");
    }
    return { success: true, authRequestId: "req-98765" };
  },

  /**
   * two-minute automated poll requirement
   * checks if the user approved an authentication request on their mobile phone.
   */
  pollMobileStatus: async (authRequestId, attemptNumber = 1) => {
    await delay(1500);
    if (attemptNumber >= 3) {
      // Simulate success
      return { status: "SUCCESS", message: "Mobile authorization cleared." };

      //success return above and uncomment below:
      // return { status: "FAILED", message: "User denied authentication or polling timed out." };
    }

    return { status: "PENDING" };
  },

  /**
   *  verification of mobile pin
   */
  verifyMobilePin: async (pinCode) => {
    await delay(1000); // 1-second network delay simulation

    // Entering the correct matching token '7' succeeds.
    // anything else throws a mock validation error.
    if (pinCode === "7") {
      return { success: true, message: "Mobile authorization cleared." };
    }
    throw new Error(
      "Incorrect authorization number. Please check your mobile and try again.",
    );
  },

  /**
   * new reset password string
   */
  submitNewPassword: async (password) => {
    await delay(1200);
    if (password === "fail1234") {
      throw new Error(
        "Password reuse policy violation. Choose a different password.",
      );
    }
    return { success: true, message: "Password updated successfully." };
  },
};
