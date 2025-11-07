import { memo } from "react";
import { TextInput } from "../components/TextInput";
import { Column } from "../components/Column";

export const Experience = memo(
  ({
    experience,
    updateNestedField,
  }: {
    experience: {
      total: number;
      spent: number;
    };
    updateNestedField: (path: string[], value: any) => void;
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <Column>
          <TextInput
            name="experience.total"
            label="Experience Total"
            value={experience.total}
            handleChange={(_, value) =>
              updateNestedField(["experience", "total"], Number(value) || 0)
            }
          />
          <TextInput
            name="experience.spent"
            label="Experience Spent"
            value={experience.spent}
            handleChange={(_, value) =>
              updateNestedField(["experience", "spent"], Number(value) || 0)
            }
          />
        </Column>
      </div>
    );
  },
);
