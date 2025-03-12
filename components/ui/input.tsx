import React from "react";

const Input = ({ placeholder, value, onChange, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
    />
  );
};

export default Input;

