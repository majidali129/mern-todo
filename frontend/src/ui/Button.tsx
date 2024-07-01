import { forwardRef, ReactNode, Ref } from "react";

interface ButtonProps {
  children: ReactNode;
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
  onClick?: () => void;
  classname?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type, disabled, onClick, classname }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`bg-[#242424f8] hover:bg-[#242424] text-slate-50 py-1.5 px-3.5 rounded-sm border-none text-xl ${classname}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
