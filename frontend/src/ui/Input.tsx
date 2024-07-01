import React, { forwardRef } from "react";
import Label from "./label";

interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>; // this ensure that , it is immutable
  checked?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, label, placeholder, value, onChange, checked }, ref) => {
    console.log(label, value);
    if (type === "radio")
      return (
        <div className="flex items-center border gap-x-1">
          <input
            type={type}
            ref={ref}
            value={value}
            name={name}
            id={label}
            onChange={onChange}
            checked={checked}
          />
          <label htmlFor={label} className="mb-1">
            {label}
          </label>
        </div>
      );

    return (
      <div className="space-y-1">
        <Label htmlFor={name} label={label} />
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
