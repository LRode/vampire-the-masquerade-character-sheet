import { memo, useCallback } from "react";
import type { Disciplines as DisciplinesType } from "../types";
import { ThreeColRow } from "../components/ThreeColRow";
import { Discipline } from "../components/Discipline";
import { Button } from "../components/Button";

export const Disciplines = memo(
  ({
    disciplines,
    updateField,
  }: {
    disciplines: DisciplinesType[];
    updateField: (path: string[], value: any) => void;
  }) => {
    const addDiscipline = useCallback(() => {
      updateField(
        ["disciplines"],
        [...disciplines, { name: "", dots: 0, abilities: [] }],
      );
    }, [disciplines, updateField]);

    const updateDiscipline = useCallback(
      (updatedDiscipline: DisciplinesType, i: number) => {
        const newDisciplines = [
          ...disciplines.slice(0, i),
          updatedDiscipline,
          ...disciplines.slice(i + 1),
        ];
        updateField(["disciplines"], newDisciplines);
      },
      [disciplines, updateField],
    );

    const deleteDiscipline = useCallback(
      (index: number) => {
        if (
          window.confirm("Are you sure you want to delete this discipline?")
        ) {
          const newDisciplines = [
            ...disciplines.slice(0, index),
            ...disciplines.slice(index + 1),
          ];
          updateField(["disciplines"], newDisciplines);
        }
      },
      [disciplines, updateField],
    );

    return (
      <section className="pt-6">
        <h2 className="uppercase border-b mb-4 text-center">Disciplines</h2>
        <ThreeColRow wrapBelowDesktop>
          {disciplines.map((discipline, i) => (
            <Discipline
              key={i}
              discipline={discipline}
              index={i}
              handleUpdateDiscipline={updateDiscipline}
              deleteDiscipline={deleteDiscipline}
            />
          ))}
        </ThreeColRow>
        <Button className="mx-auto mt-5 block p-3" onClick={addDiscipline}>
          Add Discipline
        </Button>
      </section>
    );
  },
);
