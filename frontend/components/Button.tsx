import { cn } from "@/utils/utils";
import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  title?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  disabled,
  className,
  children,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "w-full py-2 px-4 border cursor-pointer border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
