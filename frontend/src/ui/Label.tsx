const Label = ({ htmlFor, label }: { htmlFor?: string; label?: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="inline-block text-lg sm:text-[1.1rem] font-semibold"
    >
      {label}
    </label>
  );
};

export default Label;
