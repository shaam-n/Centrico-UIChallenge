import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";
import InputField from "../component/InputField";

const Login = () => {
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/reset-method");
  };

  return (
    <AuthLayout>
      <div className='login-view'>
        <h2 className='auth-title'>Login Page</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            label='Username'
            type='text'
            placeholder='Enter username'
          />

          <InputField
            label='Password'
            type='password'
            placeholder='Enter password'
          />

          <div className='remember-me-container'>
            <input type='checkbox' id='rememberMe' />
            <label htmlFor='rememberMe'>Remember me</label>
          </div>

          <div className='forgot-password-container'>
            <a
              href='#forgot-password'
              onClick={handleForgotPassword}
              className='forgot-password-link'>
              Forgot Password?
            </a>
          </div>

          <div className='button-center-wrapper'>
            <button type='submit' className='custom-btn'>
              Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
