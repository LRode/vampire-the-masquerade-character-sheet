import { memo } from "react";
import { TextInput } from "../components/TextInput";
import { TextArea } from "../components/TextArea";
import { ThreeColRow } from "../components/ThreeColRow";

export const Profile = memo(
  ({
    ambition,
    desire,
    description,
    notes,
    sire,
    birthday,
    age,
    embraced,
    apparentAge,
    generation,
    chronicleTenets,
    convictions,
    touchstonesText,
    updateField,
  }: {
    ambition: string;
    desire: string;
    description: string;
    notes: string;
    sire: string;
    birthday: string;
    age: number;
    embraced: string;
    apparentAge: number;
    generation: number;
    chronicleTenets: string;
    convictions: string;
    touchstonesText: string;
    updateField: (name: string, value: any) => void;
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <ThreeColRow>
            <TextInput
              name="ambition"
              label="Ambition"
              value={ambition}
              handleChange={updateField}
            />
            <TextInput
              name="desire"
              label="Desire"
              value={desire}
              handleChange={updateField}
            />
            <TextInput
              name="generation"
              label="Generation"
              value={generation}
              handleChange={(_, value) =>
                updateField("generation", Number(value) || 0)
              }
            />
          </ThreeColRow>

          <ThreeColRow>
            <TextArea
              name="description"
              label="Description"
              value={description}
              rows={6}
              handleChange={updateField}
            />
            <TextArea
              name="notes"
              label="Notes"
              value={notes}
              rows={6}
              handleChange={updateField}
            />
            <div>
              <TextInput
                name="sire"
                label="Sire"
                value={sire}
                handleChange={updateField}
              />
              <TextInput
                name="embraced"
                label="Embraced"
                value={embraced}
                handleChange={updateField}
              />
              <TextInput
                name="birthday"
                label="Birthday"
                value={birthday}
                handleChange={updateField}
              />
              <TextInput
                name="age"
                label="Age"
                value={age}
                handleChange={(_, value) =>
                  updateField("age", Number(value) || 0)
                }
              />
              <TextInput
                name="apparentAge"
                label="Apparent Age"
                value={apparentAge}
                handleChange={(_, value) =>
                  updateField("apparentAge", Number(value) || 0)
                }
              />
            </div>
          </ThreeColRow>
        </div>

        <h2 className="uppercase border-b mb-4 text-center">Beliefs</h2>
        <ThreeColRow>
          <TextArea
            name="chronicleTenets"
            label="Chronicle Tenets"
            value={chronicleTenets}
            rows={6}
            handleChange={updateField}
          />
          <TextArea
            name="convictions"
            label="Convictions"
            value={convictions}
            rows={6}
            handleChange={updateField}
          />
          <TextArea
            name="touchstonesText"
            label="Touchstones"
            value={touchstonesText}
            rows={6}
            handleChange={updateField}
          />
        </ThreeColRow>
      </div>
    );
  },
);
