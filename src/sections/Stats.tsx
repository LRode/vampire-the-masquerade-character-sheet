import { memo } from "react";
import { DamageTracker } from "../components/DamageTracker";
import { Dots } from "../components/Dots";
import { ThreeColRow } from "../components/ThreeColRow";
import type { Damage } from "../types";

export const Stats = memo(
  ({
    health,
    willpower,
    humanity,
    updateField,
    updateNestedField,
  }: {
    health: {
      totalDots: number;
      damage: Damage[];
    };
    willpower: {
      totalDots: number;
      damage: Damage[];
    };
    humanity: number;
    updateField: (name: string, value: any) => void;
    updateNestedField: (path: string[], value: any) => void;
  }) => {
    return (
      <div className="border border-[var(--light-bg)] my-6 pt-5">
        <ThreeColRow wrapBelowDesktop>
          <div className="mx-auto">
            <h3 className="text-center">Health</h3>
            <Dots
              name="health"
              totalDots={15}
              groupBy={5}
              filledDots={health.totalDots}
              handleChange={(value) =>
                updateNestedField(["health", "totalDots"], value)
              }
            />
            <DamageTracker
              totalPossible={15}
              groupBy={5}
              damage={health.damage}
              handleChange={(damage) =>
                updateNestedField(["health", "damage"], damage)
              }
            />
          </div>

          <div className="mx-auto">
            <h3 className="text-center">Willpower</h3>
            <Dots
              name="willpower"
              totalDots={15}
              groupBy={5}
              filledDots={willpower.totalDots}
              handleChange={(value) =>
                updateNestedField(["willpower", "totalDots"], value)
              }
            />

            <DamageTracker
              totalPossible={15}
              groupBy={5}
              damage={willpower.damage}
              handleChange={(damage) =>
                updateNestedField(["willpower", "damage"], damage)
              }
            />
          </div>

          <div className="mx-auto">
            <h3 className="text-center">Humanity</h3>
            <Dots
              name="humanity"
              totalDots={10}
              groupBy={5}
              filledDots={humanity}
              handleChange={(value) => updateField("humanity", value)}
            />
          </div>
        </ThreeColRow>
      </div>
    );
  },
);
