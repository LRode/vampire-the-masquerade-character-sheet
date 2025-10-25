import { memo } from "react";
import { Attribute } from "../components/Attribute";
import { Column } from "../components/Column";
import { ThreeColRow } from "../components/ThreeColRow";
import type { Attribute as AttributeType } from "../types";

export const Attributes = memo(
  ({
    attributes,
    updateNestedField,
  }: {
    attributes: Record<AttributeType, number>;
    updateNestedField: (path: string[], value: any) => void;
  }) => {
    return (
      <section>
        <h2 className="uppercase border-b mb-2 text-center">Attributes</h2>
        <ThreeColRow>
          <Column>
            <h3 className="text-center">Physical</h3>
            <Attribute
              name="strength"
              label="Strength"
              dots={attributes.strength}
              handleChange={(value) =>
                updateNestedField(["attributes", "strength"], value)
              }
            />
            <Attribute
              name="dexterity"
              label="Dexterity"
              dots={attributes.dexterity}
              handleChange={(value) =>
                updateNestedField(["attributes", "dexterity"], value)
              }
            />
            <Attribute
              name="stamina"
              label="Stamina"
              dots={attributes.stamina}
              handleChange={(value) =>
                updateNestedField(["attributes", "stamina"], value)
              }
            />
          </Column>

          <Column>
            <h3 className="text-center">Social</h3>
            <Attribute
              name="charisma"
              label="Charisma"
              dots={attributes.charisma}
              handleChange={(value) =>
                updateNestedField(["attributes", "charisma"], value)
              }
            />
            <Attribute
              name="manipulation"
              label="Manipulation"
              dots={attributes.manipulation}
              handleChange={(value) =>
                updateNestedField(["attributes", "manipulation"], value)
              }
            />
            <Attribute
              name="composure"
              label="Composure"
              dots={attributes.composure}
              handleChange={(value) =>
                updateNestedField(["attributes", "composure"], value)
              }
            />
          </Column>

          <Column>
            <h3 className="text-center">Mental</h3>
            <Attribute
              name="intelligence"
              label="Intelligence"
              dots={attributes.intelligence}
              handleChange={(value) =>
                updateNestedField(["attributes", "intelligence"], value)
              }
            />
            <Attribute
              name="wits"
              label="Wits"
              dots={attributes.wits}
              handleChange={(value) =>
                updateNestedField(["attributes", "wits"], value)
              }
            />
            <Attribute
              name="resolve"
              label="Resolve"
              dots={attributes.resolve}
              handleChange={(value) =>
                updateNestedField(["attributes", "resolve"], value)
              }
            />
          </Column>
        </ThreeColRow>
      </section>
    );
  },
);
