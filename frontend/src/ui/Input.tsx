import React, { forwardRef } from "react";

interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>; // this ensure that , it is immutable
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, label, placeholder, value, onChange }, ref) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={name}
          className="inline-block text-lg sm:text-[1.1rem] font-semibold"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          className="w-full p-1.5 text-lg outline-none bg-gray-200 focus:bg-gray-300 transition-all duration-200"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default Input;
