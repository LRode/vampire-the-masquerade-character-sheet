import { memo } from "react";
import { Dots } from "../components/Dots";
import { TextInput } from "../components/TextInput";
import { Column } from "../components/Column";

export const TheBlood = memo(
  ({
    bloodPotency,
    bloodSurge,
    baneSeverity,
    powerBonus,
    mendAmount,
    rouseReRoll,
    feedingPenalty,
    updateField,
  }: {
    bloodPotency: number;
    bloodSurge: string;
    baneSeverity: string;
    powerBonus: string;
    mendAmount: string;
    rouseReRoll: string;
    feedingPenalty: string;
    updateField: (name: string, value: any) => void;
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <h3 className="text-center mb-2">Blood Potency</h3>
        <div className="flex justify-center mb-4">
          <Dots
            name="bloodPotency"
            totalDots={10}
            filledDots={bloodPotency}
            handleChange={(value) => updateField("bloodPotency", value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <Column>
            <TextInput
              name="bloodSurge"
              label="Blood Surge"
              value={bloodSurge}
              handleChange={updateField}
            />
            <TextInput
              name="powerBonus"
              label="Power Bonus"
              value={powerBonus}
              handleChange={updateField}
            />
            <TextInput
              name="mendAmount"
              label="Mend Amount"
              value={mendAmount}
              handleChange={updateField}
            />
          </Column>
          <Column>
            <TextInput
              name="rouseReRoll"
              label="Rouse Reroll"
              value={rouseReRoll}
              handleChange={updateField}
            />
            <TextInput
              name="baneSeverity"
              label="Bane Severity"
              value={baneSeverity}
              handleChange={updateField}
            />
            <TextInput
              name="feedingPenalty"
              label="Feeding Penalty"
              value={feedingPenalty}
              handleChange={updateField}
            />
          </Column>
        </div>
      </div>
    );
  },
);
