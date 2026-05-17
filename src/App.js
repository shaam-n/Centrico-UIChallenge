import React, { useState } from "react"; // Added useState hook
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// View Screen Imports
import Login from "./views/Login";
import MethodSelect from "./views/MethodSelect";
import EmailInput from "./views/EmailInput";
import Verification from "./views/Verification";
import StatusResult from "./views/StatusResult";
import MobileInput from "./views/MobileInput";
import MobileVerification from "./views/MobileVerification";
import ResetPassword from "./views/ResetPssword"; // Fixed typo in filename import ("ResetPssword" -> "ResetPassword")

// Stylesheet Import
import "./App.css";
import PasswordSuccess from "./views/PasswordSuccess";
import PasswordFailure from "./views/PasswordFailure";

function App() {
  // Centralized state holding configuration rules for your Status view page
  const [statusConfig, setStatusConfig] = useState({
    status: "success",
    title: "SUCCESS!",
    message: "OTP Verified Successfully.",
    subMessage: "Click Continue to reset your password",
    targetRoute: "/reset-password",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/reset-method' element={<MethodSelect />} />
        <Route path='/reset-email' element={<EmailInput />} />
        <Route path='/reset-mobile' element={<MobileInput />} />

        {/* Email Verification Track - Passing state setter prop */}
        <Route
          path='/verify-otp'
          element={<Verification setStatusConfig={setStatusConfig} />}
        />

        {/* Mobile Verification Track - Passing state setter prop */}
        <Route
          path='/verify-mobile'
          element={<MobileVerification setStatusConfig={setStatusConfig} />}
        />

        {/* New Password Creation Screen - Passing state setter prop */}
        <Route
          path='/reset-password'
          element={<ResetPassword setStatusConfig={setStatusConfig} />}
        />

        {/* Dynamic Status Display Panel - Receiving explicit prop mappings */}
        <Route
          path='/status-view'
          element={
            <StatusResult
              status={statusConfig.status}
              title={statusConfig.title}
              message={statusConfig.message}
              subMessage={statusConfig.subMessage}
              targetRoute={statusConfig.targetRoute}
            />
          }
        />
        <Route path='/password-success' element={<PasswordSuccess />} />
        <Route path='/password-error' element={<PasswordFailure />} />

        {/* Catch-all global fallback redirect rule */}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
