import React from "react";

const Button = (props) => {
  const { children, onClick, type = "button", disabled } = props;
  return (
    <button
      type={type}
      className='custom-btn'
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
