import { memo } from "react";
import type { SkillRecord } from "../types";
import { Dots } from "./Dots";

export const Skill = memo(
  ({
    name,
    skill,
    handleChange,
  }: {
    name: string;
    skill: SkillRecord;
    handleChange: (value: SkillRecord) => void;
  }) => {
    return (
      <div className="flex items-center justify-between leading-none gap-2">
        <label htmlFor={`${name}-specialty`} className="capitalize text-nowrap">
          {name}
        </label>
        <input
          type="text"
          name={`${name}-specialty`}
          id={`${name}-specialty`}
          value={skill.specialty}
          autoComplete="off"
          onChange={(e) =>
            handleChange({
              ...skill,
              specialty: e.target.value,
            })
          }
          className={`bg-[var(--surface)] p-1 flex min-w-0`}
        />
        <Dots
          name={name}
          totalDots={5}
          filledDots={skill.dots}
          handleChange={(value) =>
            handleChange({
              ...skill,
              dots: value,
            })
          }
        />
      </div>
    );
  },
);
