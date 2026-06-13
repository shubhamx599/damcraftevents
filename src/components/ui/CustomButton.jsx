import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Magnetic from "./Magnetic";

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
    primary: "border-[var(--text-primary)] text-[var(--bg-dark)] bg-[var(--text-primary)] hover:bg-transparent hover:text-[var(--text-primary)]",
    secondary: "border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-dark)]",
    outline: "border-[var(--border-glass)] text-[var(--text-secondary)] hover:bg-[var(--border-glass)] hover:text-[var(--text-primary)]",
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
    border-2
    rounded-full
    flex
    justify-center
    items-center
    font-semibold
    transform
    scale-100
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
    <Magnetic>
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
    </Magnetic>
  );
};

export default CustomButton;
