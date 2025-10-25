import { memo } from "react";
import { TextInput } from "../components/TextInput";
import { ThreeColRow } from "../components/ThreeColRow";

export const Overview = memo(
  ({
    name,
    clan,
    predatorType,
    updateField,
    updateNestedField,
  }: {
    name: string;
    clan: string;
    predatorType: string;
    updateField: (name: string, value: any) => void;
    updateNestedField: (path: string[], value: any) => void;
  }) => {
    return (
      <ThreeColRow>
        <TextInput
          name="name"
          label="Name"
          value={name}
          handleChange={updateField}
        />
        <TextInput
          name="clan"
          label="Clan"
          value={clan}
          handleChange={updateField}
        />
        <TextInput
          name="predatorType.name"
          label="Predator type"
          value={predatorType}
          handleChange={(_, value) =>
            updateNestedField(["predatorType", "name"], value)
          }
        />
      </ThreeColRow>
    );
  },
);
