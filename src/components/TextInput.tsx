import { memo } from "react";

export const TextInput = memo(
  ({
    name,
    label,
    value,
    handleChange,
    className = "",
    labelClassName = "",
  }: {
    name: string;
    label: string;
    value: string | number;
    handleChange: (key: string, value: string) => void;
    className?: string;
    labelClassName?: string;
  }) => {
    return (
      <label className={`flex flex-col ${labelClassName}`}>
        {label}
        <input
          type="text"
          name={name}
          key={name}
          value={value}
          autoComplete="off"
          onChange={(e) => handleChange(name, e.target.value)}
          className={`bg-[var(--surface)] p-1 w-full ${className}`}
        />
      </label>
    );
  },
);
