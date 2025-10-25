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
        <ThreeColRow></ThreeColRow>

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
