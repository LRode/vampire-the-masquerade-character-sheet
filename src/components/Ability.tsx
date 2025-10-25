import { memo, useState } from "react";
import type { Ability as AbilityType } from "../types";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { TextArea } from "./TextArea";

export const Ability = memo(
  ({
    ability,
    index,
    handleUpdateAbility,
    deleteAbility,
  }: {
    ability: AbilityType;
    index: number;
    handleUpdateAbility: (ability: AbilityType, i: number) => void;
    deleteAbility: (index: number) => void;
  }) => {
    const { name, dicePools, duration, cost, summary } = ability;
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <div className="border-b border-[var(--primary)] mt-3 mb-3" />
        <div className="flex gap-2 items-center justify-between">
          <TextInput
            name={`discipline-name-${index}`}
            label={`Name`}
            isLabelVisible={false}
            value={name}
            labelClassName="flex-row flex-grow"
            className="flex-grow"
            handleChange={(_, value) =>
              handleUpdateAbility(
                {
                  ...ability,
                  name: value,
                },
                index,
              )
            }
          />
          <Button
            className="w-6 h-6"
            onClick={() => setIsDetailsVisible(!isDetailsVisible)}
          >
            <span
              className={`block ${isDetailsVisible ? "mt-1" : "rotate-180 -mt-1"}`}
            >
              ^
            </span>
          </Button>
        </div>

        <div
          className={`flex flex-col gap-2 ${isDetailsVisible ? "block" : "hidden"}`}
        >
          <TextInput
            name={`discipline-dicePools-${index}`}
            label={`Dice Pools`}
            value={dicePools}
            isRowLayout
            handleChange={(_, value) =>
              handleUpdateAbility(
                {
                  ...ability,
                  dicePools: value,
                },
                index,
              )
            }
          />
          <TextInput
            name={`discipline-cost-${index}`}
            label={`Cost`}
            value={cost}
            isRowLayout
            handleChange={(_, value) =>
              handleUpdateAbility(
                {
                  ...ability,
                  cost: value,
                },
                index,
              )
            }
          />
          <TextInput
            name={`discipline-duration-${index}`}
            label={`Duration`}
            value={duration}
            isRowLayout
            handleChange={(_, value) =>
              handleUpdateAbility(
                {
                  ...ability,
                  duration: value,
                },
                index,
              )
            }
          />

          <TextArea
            name={`discipline-summary-${index}`}
            label={`Summary`}
            value={summary}
            rows={3}
            handleChange={(_, value) =>
              handleUpdateAbility(
                {
                  ...ability,
                  summary: value,
                },
                index,
              )
            }
          />

          <Button
            className="w-fit py-1 px-3"
            onClick={() => deleteAbility(index)}
          >
            Delete Ability
          </Button>
        </div>
      </div>
    );
  },
);
