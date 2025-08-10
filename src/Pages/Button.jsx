// src/components/ui/Button.jsx
import React from "react";

const Button = ({ variant = "filled", children, className = "", ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition";

    const variants = {
        filled: "bg-teal-500 text-white hover:bg-teal-600",
        outline: "border border-teal-500 text-teal-500 hover:bg-teal-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
