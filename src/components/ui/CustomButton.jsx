import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  label = "Read More",
  to,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  onClick,
}) => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const sizeClasses = {
    small: "px-6 py-2 text-sm",
    medium: "px-8 py-3 text-base",
    large: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary: "border-black text-black hover:bg-black hover:text-white",
    secondary: "border-white text-white hover:bg-white hover:text-black",
    outline: "border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black",
  };

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Ripple logic
    const button = buttonRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);

    // Navigation or custom action
    if (onClick) onClick();
    if (to) {
      if (to.startsWith("http")) {
        window.open(to, "_blank", "noopener,noreferrer");
      } else {
        navigate(to);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const buttonClasses = `
    relative
    overflow-hidden
    bg-transparent
    border-2
    rounded-full
    flex
    justify-center
    items-center
    font-semibold
    transition-all
    duration-300
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${
      disabled || loading
        ? "cursor-not-allowed opacity-60"
        : "cursor-pointer hover:scale-[1.05] active:scale-95"
    }
  `;

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={disabled || loading}
      aria-label={loading ? "Loading..." : label}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Loading...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;
