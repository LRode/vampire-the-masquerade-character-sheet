import type React from "react";

export const Button = ({
  disabled = false,
  onClick,
  className = "",
  children,
}: React.PropsWithChildren<{
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}>) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-sm bg-[var(--primary)] leading-none cursor-pointer disabled:opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
