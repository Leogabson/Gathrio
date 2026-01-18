import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#1F2937] mb-2"
        >
          {label} {required && <span className="text-[#EF4444]">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all ${
          error
            ? "border-[#EF4444] focus:ring-[#EF4444]"
            : "border-gray-300 focus:border-[#6366F1]"
        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && <p className="mt-1 text-sm text-[#EF4444]">{error}</p>}
    </div>
  );
};

export default Input;
