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
    <div className="flex align-items justify-between">
      {label}
      <Dots
        name={name}
        totalDots={5}
        filledDots={dots}
        handleChange={handleChange}
      />
    </div>
  );
};
