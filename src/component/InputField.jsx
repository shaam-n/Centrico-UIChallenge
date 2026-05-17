import React from "react";

const InputField = (props) => {
  const { label, type = "text", placeholder, value, onChange, error } = props;
  return (
    <div className='form-group'>
      {label && <label className='form-label'>{label}</label>}

      <input
        type={type}
        className={`custom-input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className='error-message'>{error}</span>}
    </div>
  );
};

export default InputField;
