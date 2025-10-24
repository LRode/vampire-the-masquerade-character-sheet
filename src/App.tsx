import { useEffect, useState } from "react";
import type { CharacterSheet } from "./types";
import { EMPTY_CHARACTER } from "./emptyCharacter";
import {
  debouncedSaveCharacterSheetToLocalStorage,
  getCharacterSheetFromLocalStorage,
} from "./utils/localStorage";

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

  return (
    <>
      <h1 className="text-center text-xl">
        <div className="uppercase text-5xl border-y w-fit mx-auto">Vampire</div>
        <div className="uppercase">The Masquerade</div>
        <div className="">Online Character Sheet</div>
      </h1>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={characterSheet.name}
          onChange={(e) => {
            setCharacterSheet({
              ...characterSheet,
              name: e.target.value,
            });
          }}
        />
      </label>
    </>
  );
}

export default App;
