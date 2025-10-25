import { memo, useMemo } from "react";
import { ThreeColRow } from "../components/ThreeColRow";
import { SKILL, type Skill as SkillType, type SkillRecord } from "../types";
import { Skill } from "../components/Skill";

export const Skills = memo(
  ({
    characterSheetSkills,
    updateField,
  }: {
    characterSheetSkills: Record<SkillType, SkillRecord>;
    updateField: (path: string[], value: any) => void;
  }) => {
    const skills = useMemo(() => {
      return Object.keys(SKILL).sort();
    }, []);

    return (
      <section>
        <h2 className="uppercase border-b mb-4 text-center">Skills</h2>
        <ThreeColRow wrapBelowDesktop>
          {skills.map((skillKey) => {
            const skill = SKILL[skillKey as keyof typeof SKILL];
            return (
              <Skill
                key={skill}
                name={skill}
                skill={characterSheetSkills[skill]}
                handleChange={(newSkillValue) =>
                  updateField(["skills", skill], newSkillValue)
                }
              />
            );
          })}
        </ThreeColRow>
      </section>
    );
  },
);
