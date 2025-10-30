import { memo } from "react";
import type { Merit as MeritType } from "../types";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { Dots } from "./Dots";

export const Merit = memo(
  ({
    merit,
    index,
    handleUpdateMerit,
    deleteMerit,
  }: {
    merit: MeritType;
    index: number;
    handleUpdateMerit: (merit: MeritType, i: number) => void;
    deleteMerit: (index: number) => void;
  }) => {
    const { name, dots, summary } = merit;

    return (
      <div className="mb-6 flex flex-col gap-y-2">
        <div className="flex gap-2 items-center justify-between">
          <TextInput
            name={`merit-name-${index}`}
            label={`Name`}
            isLabelVisible={false}
            value={name}
            labelClassName="flex-row flex-grow"
            className="flex-grow"
            handleChange={(_, value) =>
              handleUpdateMerit(
                {
                  ...merit,
                  name: value,
                },
                index,
              )
            }
          />
          <Dots
            name={`merit-dots-${name}`}
            totalDots={5}
            filledDots={dots}
            handleChange={(value) =>
              handleUpdateMerit(
                {
                  ...merit,
                  dots: value,
                },
                index,
              )
            }
          />
        </div>

        <TextInput
          name={`merit-summary-${index}`}
          label={`Summary`}
          value={summary}
          className="flex-grow"
          labelClassName="flex-row flex-grow gap-x-2"
          handleChange={(_, value) =>
            handleUpdateMerit(
              {
                ...merit,
                summary: value,
              },
              index,
            )
          }
        />
        <Button
          className="w-fit py-1 px-3 mt-3"
          onClick={() => deleteMerit(index)}
        >
          Delete
        </Button>

        <div className="border-b border-[var(--primary)] mt-3 mb-3" />
      </div>
    );
  },
);
