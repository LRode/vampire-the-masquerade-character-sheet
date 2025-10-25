import { useEffect, useState } from "react";
import type { CharacterSheet } from "./types";
import { EMPTY_CHARACTER } from "./emptyCharacter";
import {
  debouncedSaveCharacterSheetToLocalStorage,
  getCharacterSheetFromLocalStorage,
} from "./utils/localStorage";
import { TextInput } from "./components/TextInput";
import { Column } from "./components/Column";
import { ThreeColRow } from "./components/ThreeColRow";
import { Dots } from "./components/Dots";
import { DamageTracker } from "./components/DamageTracker";
import { Attribute } from "./components/Attribute";

function App() {
  const [characterSheet, setCharacterSheet] =
    useState<CharacterSheet>(EMPTY_CHARACTER);

  useEffect(() => {
    const cachedCharacterSheet = getCharacterSheetFromLocalStorage();
    if (cachedCharacterSheet) {
      setCharacterSheet(cachedCharacterSheet);
    }
  }, []);

  useEffect(() => {
    debouncedSaveCharacterSheetToLocalStorage(characterSheet);
  }, [characterSheet]);

  const updateField = (key: string, value: any) => {
    setCharacterSheet({
      ...characterSheet,
      [key]: value,
    });
  };

  return (
    <>
      <h1 className="text-center text-xl mb-8 bg-[var(--background)] -m-7 px-6 w-fit mx-auto">
        <div className="uppercase text-5xl border-y w-fit mx-auto">Vampire</div>
        <div className="uppercase">The Masquerade</div>
        <div className="">Online Character Sheet</div>
      </h1>

      <main>
        <ThreeColRow>
          <TextInput
            name="name"
            label="Name"
            value={characterSheet.name}
            handleChange={updateField}
          />
          <TextInput
            name="clan"
            label="Clan"
            value={characterSheet.clan}
            handleChange={updateField}
          />
          <TextInput
            name="predatorType.name"
            label="Predator type"
            value={characterSheet.predatorType.name}
            handleChange={(_, value) =>
              updateField("predatorType", {
                ...characterSheet.predatorType,
                name: value,
              })
            }
          />
        </ThreeColRow>

        <div className="border border-[var(--light-bg)] my-6 pt-5">
          <ThreeColRow wrapBelowDesktop>
            <div className="mx-auto">
              <h3 className="text-center">Health</h3>
              <Dots
                name="health"
                totalDots={15}
                groupBy={5}
                filledDots={characterSheet.health.totalDots}
                handleChange={(value) =>
                  updateField("health", {
                    ...characterSheet.health,
                    totalDots: value,
                  })
                }
              />
              <DamageTracker
                totalPossible={15}
                groupBy={5}
                damage={characterSheet.health.damage}
                handleChange={(damage) =>
                  updateField("health", {
                    ...characterSheet.health,
                    damage,
                  })
                }
              />
            </div>

            <div className="mx-auto">
              <h3 className="text-center">Willpower</h3>
              <Dots
                name="willpower"
                totalDots={15}
                groupBy={5}
                filledDots={characterSheet.willpower.totalDots}
                handleChange={(value) =>
                  updateField("willpower", {
                    ...characterSheet.willpower,
                    totalDots: value,
                  })
                }
              />

              <DamageTracker
                totalPossible={15}
                groupBy={5}
                damage={characterSheet.willpower.damage}
                handleChange={(damage) =>
                  updateField("willpower", {
                    ...characterSheet.willpower,
                    damage,
                  })
                }
              />
            </div>

            <div className="mx-auto">
              <h3 className="text-center">Humanity</h3>
              <Dots
                name="humanity"
                totalDots={10}
                groupBy={5}
                filledDots={characterSheet.humanity}
                handleChange={(value) => updateField("humanity", value)}
              />
            </div>
          </ThreeColRow>
        </div>

        <h2 className="uppercase border-b mb-2 text-center">Attributes</h2>
        <ThreeColRow>
          <Column>
            <h3 className="text-center">Physical</h3>
            <Attribute
              name="strength"
              label="Strength"
              dots={characterSheet.attributes.strength}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  strength: value,
                })
              }
            />
            <Attribute
              name="dexterity"
              label="Dexterity"
              dots={characterSheet.attributes.dexterity}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  dexterity: value,
                })
              }
            />
            <Attribute
              name="stamina"
              label="Stamina"
              dots={characterSheet.attributes.stamina}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  stamina: value,
                })
              }
            />
          </Column>

          <Column>
            <h3 className="text-center">Social</h3>
            <Attribute
              name="charisma"
              label="Charisma"
              dots={characterSheet.attributes.charisma}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  charisma: value,
                })
              }
            />
            <Attribute
              name="manipulation"
              label="Manipulation"
              dots={characterSheet.attributes.manipulation}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  manipulation: value,
                })
              }
            />
            <Attribute
              name="composure"
              label="Composure"
              dots={characterSheet.attributes.composure}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  composure: value,
                })
              }
            />
          </Column>

          <Column>
            <h3 className="text-center">Mental</h3>
            <Attribute
              name="intelligence"
              label="Intelligence"
              dots={characterSheet.attributes.intelligence}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  intelligence: value,
                })
              }
            />
            <Attribute
              name="wits"
              label="Wits"
              dots={characterSheet.attributes.wits}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  wits: value,
                })
              }
            />
            <Attribute
              name="resolve"
              label="Resolve"
              dots={characterSheet.attributes.resolve}
              handleChange={(value) =>
                updateField("attributes", {
                  ...characterSheet.attributes,
                  resolve: value,
                })
              }
            />
          </Column>
        </ThreeColRow>

        <ThreeColRow>
          <Column>
            <TextInput
              name="sect"
              label="Sect"
              value={characterSheet.sect}
              handleChange={updateField}
            />
          </Column>

          <Column>
            <TextInput
              name="generation"
              label="Generation"
              value={characterSheet.generation}
              handleChange={updateField}
            />
          </Column>

          <Column>
            <TextInput
              name="Chronicle"
              label="Chronicle"
              value={characterSheet.chronicle}
              handleChange={updateField}
            />
            <TextInput
              name="ambition"
              label="Ambition"
              value={characterSheet.ambition}
              handleChange={updateField}
            />
            <TextInput
              name="desire"
              label="Desire"
              value={characterSheet.desire}
              handleChange={updateField}
            />
          </Column>
        </ThreeColRow>
      </main>
    </>
  );
}

export default App;
