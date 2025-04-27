import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  isFullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthClass = isFullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${widthClass} ${className || ""}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
