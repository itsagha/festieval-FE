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
  variant = "",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-3 rounded-xl text-sm font-medium
        duration-500 ease-in-out hover:scale-102 
        ${variant} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer hover:shadow-md"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
