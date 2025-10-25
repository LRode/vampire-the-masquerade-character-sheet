import { memo } from "react";
import type { SkillRecord } from "../types";
import { Dots } from "./Dots";
import { TextInput } from "./TextInput";

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
        <TextInput
          name={`${name}-specialty`}
          label={name}
          isRowLayout
          value={skill.specialty ?? ""}
          handleChange={(_, value) =>
            handleChange({
              ...skill,
              specialty: value,
            })
          }
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
