import { useEffect, useState } from "react";
import type { CharacterSheet } from "./types";
import { EMPTY_CHARACTER } from "./emptyCharacter";
import {
  debouncedSaveCharacterSheetToLocalStorage,
  getCharacterSheetFromLocalStorage,
} from "./utils/localStorage";
import { TextInput } from "./components/TextInput";
import { Column } from "./components/Column";
import { Section } from "./components/Section";

function App() {
  const [characterSheet, setCharacterSheet] =
    useState<CharacterSheet>(EMPTY_CHARACTER);

  useEffect(() => {
    const cachedCharacterSheet = getCharacterSheetFromLocalStorage();
    setCharacterSheet(cachedCharacterSheet);
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
      <h1 className="text-center text-xl mb-8 bg-[var(--background)] -m-6 px-6 w-fit mx-auto">
        <div className="uppercase text-5xl border-y w-fit mx-auto">Vampire</div>
        <div className="uppercase">The Masquerade</div>
        <div className="">Online Character Sheet</div>
      </h1>

      <main className="max-w-6xl">
        <Section>
          <Column>
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
              name="sect"
              label="Sect"
              value={characterSheet.sect}
              handleChange={updateField}
            />
          </Column>

          <Column>
            <TextInput
              name="player"
              label="Player"
              value={characterSheet.player}
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
            <TextInput
              name="generation"
              label="Generation"
              value={characterSheet.generation}
              handleChange={updateField}
            />
          </Column>
        </Section>
      </main>
    </>
  );
}

export default App;
