import { memo, useCallback } from "react";
import type { Merit as MeritType } from "../types";
import { Merit } from "../components/Merit";
import { Button } from "../components/Button";

export const Merits = memo(
  ({
    merits,
    type,
    field,
    updateField,
  }: {
    merits: MeritType[];
    type: "merit" | "flaw";
    field: "merits" | "flaws";
    updateField: (path: string[], value: any) => void;
  }) => {
    const addMerit = useCallback(() => {
      updateField(
        [field],
        [...merits, { name: "", dots: 0, summary: "", type }],
      );
    }, [merits, updateField]);

    const updateMerit = useCallback(
      (updatedMerit: MeritType, i: number) => {
        const newMerits = [
          ...merits.slice(0, i),
          updatedMerit,
          ...merits.slice(i + 1),
        ];
        updateField([field], newMerits);
      },
      [merits, updateField],
    );

    const deleteMerit = useCallback(
      (index: number) => {
        if (window.confirm("Are you sure you want to delete this merit?")) {
          const newMerits = [
            ...merits.slice(0, index),
            ...merits.slice(index + 1),
          ];
          updateField([field], newMerits);
        }
      },
      [merits, updateField],
    );

    return (
      <div>
        <h3 className="capitalize mb-4 text-center mt-6 lg:mt-0">{field}</h3>
        {merits.map((merit, i) => (
          <Merit
            key={i}
            merit={merit}
            index={i}
            handleUpdateMerit={updateMerit}
            deleteMerit={deleteMerit}
          />
        ))}
        <Button className="mx-auto mt-4 block p-3" onClick={addMerit}>
          Add {type}
        </Button>
      </div>
    );
  },
);
