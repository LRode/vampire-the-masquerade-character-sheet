import { Dots } from "./Dots";

export const Attribute = ({
  name,
  label,
  dots,
  handleChange,
}: {
  name: string;
  label: string;
  dots: number;
  handleChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <Dots
        name={name}
        totalDots={5}
        filledDots={dots}
        handleChange={handleChange}
      />
    </div>
  );
};
