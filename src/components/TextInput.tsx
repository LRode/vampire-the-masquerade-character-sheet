export const TextInput = ({
  name,
  label,
  value,
  handleChange,
}: {
  name: string;
  label: string;
  value: string | number;
  handleChange: (key: string, value: string) => void;
}) => {
  return (
    <label className="flex flex-col">
      {label}
      <input
        type="text"
        name={name}
        key={name}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)}
        className="bg-[var(--surface)] p-1 w-full md:w-55"
      />
    </label>
  );
};
