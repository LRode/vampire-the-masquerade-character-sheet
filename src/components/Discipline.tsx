import { memo, useCallback } from "react";
import type { Ability as AbilityType, Disciplines } from "../types";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { Dots } from "./Dots";
import { Ability } from "./Ability";

export const Discipline = memo(
  ({
    discipline,
    index,
    handleUpdateDiscipline,
    deleteDiscipline,
  }: {
    discipline: Disciplines;
    index: number;
    handleUpdateDiscipline: (discipline: Disciplines, i: number) => void;
    deleteDiscipline: (index: number) => void;
  }) => {
    const { name, dots, abilities } = discipline;

    const addAbility = useCallback(() => {
      handleUpdateDiscipline(
        {
          ...discipline,
          abilities: [
            ...abilities,
            {
              name: "",
              cost: "",
              dicePools: "",
              duration: "",
              summary: "",
              level: 1,
            },
          ],
        },
        index,
      );
    }, [abilities, handleUpdateDiscipline]);

    const updateAbility = useCallback(
      (updatedAbility: AbilityType, i: number) => {
        const newAbilities = [
          ...abilities.slice(0, i),
          updatedAbility,
          ...abilities.slice(i + 1),
        ];
        handleUpdateDiscipline(
          { ...discipline, abilities: newAbilities },
          index,
        );
      },
      [abilities, handleUpdateDiscipline],
    );

    const deleteAbility = useCallback(
      (i: number) => {
        if (window.confirm("Are you sure you want to delete this ability?")) {
          const newAbilities = [
            ...abilities.slice(0, i),
            ...abilities.slice(i + 1),
          ];
          handleUpdateDiscipline(
            { ...discipline, abilities: newAbilities },
            index,
          );
        }
      },
      [abilities, handleUpdateDiscipline],
    );

    return (
      <div className="mb-6">
        <div className="flex gap-2 items-center justify-between">
          <TextInput
            name={`discipline-name-${index}`}
            label={`Name`}
            isLabelVisible={false}
            value={name}
            labelClassName="flex-row flex-grow"
            className="flex-grow"
            handleChange={(_, value) =>
              handleUpdateDiscipline(
                {
                  ...discipline,
                  name: value,
                },
                index,
              )
            }
          />
          <Dots
            name={`discipline-dots-${name}`}
            totalDots={5}
            filledDots={dots}
            handleChange={(value) =>
              handleUpdateDiscipline(
                {
                  ...discipline,
                  dots: value,
                },
                index,
              )
            }
          />
        </div>

        <div className="mt-2">
          <div className="flex gap-2 mb-1">
            <h3>Abilities</h3>
            <Button className="w-6 h-6" onClick={addAbility}>
              +
            </Button>
          </div>
          <div className="flex flex-col gap-y-4">
            {abilities.map((ability, i) => (
              <Ability
                ability={ability}
                index={i}
                handleUpdateAbility={updateAbility}
                deleteAbility={deleteAbility}
              />
            ))}
          </div>
        </div>

        <div className="border-b border-[var(--primary)] mt-6 mb-3" />
        <Button
          className="w-fit py-1 px-3"
          onClick={() => deleteDiscipline(index)}
        >
          Delete
        </Button>
      </div>
    );
  },
);
