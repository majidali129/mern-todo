import { FormEvent, forwardRef, ReactNode, Ref } from "react";

interface FormProps {
  children: ReactNode;
  heading?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  ref?: Ref<HTMLFormElement>;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, heading, onSubmit }, ref) => {
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <div className="w-11/12  md:w-full max-w-md px-4 py-4 bg-white rounded-[3px]">
          <div className="mb-4 text-center">
            <h3 className="text-[2.5rem] text-black">{heading}</h3>
          </div>
          <form onSubmit={onSubmit} ref={ref} className="space-y-3 ">
            {children}
          </form>
        </div>
      </div>
    );
  }
);

export default Form;
