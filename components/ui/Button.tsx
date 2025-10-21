import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "bg-primary text-black",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden px-5 py-2 rounded-lg text-sm
        transition-all duration-500 ease-out
        ${variant} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
        group
      `}
    >
      {/* Background slide animation */}
      <span
        className="absolute inset-0 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out
        "
      ></span>

      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
