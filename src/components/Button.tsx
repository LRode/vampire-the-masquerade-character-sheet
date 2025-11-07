import type React from "react";

export const Button = ({
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
  children,
}: React.PropsWithChildren<{
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
}>) => {
  const variantClasses =
    variant === "secondary"
      ? "bg-[var(--surface)] hover:bg-gray-700 border border-gray-600"
      : "bg-[var(--primary)]";

  return (
    <button
      disabled={disabled}
      className={`rounded-sm ${variantClasses} leading-none cursor-pointer disabled:opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
