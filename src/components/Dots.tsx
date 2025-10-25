export const Dots = ({
  name,
  filledDots,
  totalDots,
  groupBy = undefined,
  handleChange,
}: {
  name: string;
  filledDots: number;
  totalDots: number;
  groupBy?: number;
  handleChange: (value: number) => void;
}) => {
  const dots = [];
  for (let i = 1; i < totalDots + 1; i++) {
    dots.push({ dotNumber: i, isFilled: filledDots >= i });
  }

  return (
    <div className="flex">
      {dots.map((dot) => (
        <label key={dot.dotNumber} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name={`${name}-dot-${dot.dotNumber}`}
            checked={dot.isFilled}
            className={`peer hidden`}
            onChange={(e) => {
              if (e.target.checked) {
                handleChange(dot.dotNumber);
              } else {
                handleChange(dot.dotNumber - 1);
              }
            }}
          />
          <span
            className={`w-4 h-4 rounded-full border border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:border-[var(--light-bg)] bg-[var(--light-bg)] ${groupBy && dot.dotNumber % groupBy === 0 ? "mr-3" : "mr-[2px]"}`}
          />
          <span className="sr-only">Toggle dot {dot.dotNumber}</span>
        </label>
      ))}
    </div>
  );
};
