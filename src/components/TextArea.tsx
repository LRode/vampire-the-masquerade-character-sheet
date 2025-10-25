import { memo } from "react";

export const TextArea = memo(
  ({
    name,
    label,
    isLabelVisible = true,
    value,
    handleChange,
    className = "",
    labelClassName = "",
    rows = 2,
  }: {
    name: string;
    label: string;
    isLabelVisible?: boolean;
    value: string | number;
    handleChange: (key: string, value: string) => void;
    className?: string;
    labelClassName?: string;
    rows?: number;
  }) => {
    return (
      <label className={`capitalize flex flex-col ${labelClassName}`}>
        <span className={`${isLabelVisible ? "" : "sr-only"} text-nowrap`}>
          {label}
        </span>
        <textarea
          name={name}
          key={name}
          value={value}
          rows={rows}
          autoComplete="off"
          onChange={(e) => handleChange(name, e.target.value)}
          className={`bg-[var(--surface)] p-1 w-full ${className}`}
        />
      </label>
    );
  },
);
