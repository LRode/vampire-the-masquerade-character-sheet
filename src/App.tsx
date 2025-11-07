import { useEffect, useReducer, useCallback, useState } from "react";
import { type CharacterSheet } from "./types";
import { EMPTY_CHARACTER } from "./emptyCharacter";
import {
  debouncedSaveCharacterSheetToLocalStorage,
  getCharacterSheetFromLocalStorage,
  saveCharacterSheetToLocalStorage,
  getActiveSheetId,
  getCharacterSheetList,
  createNewCharacterSheet,
} from "./utils/localStorage";
import { Skills } from "./sections/Skills";
import { Overview } from "./sections/Overview";
import { Attributes } from "./sections/Attributes";
import { Stats } from "./sections/Stats";
import { Disciplines } from "./sections/Disciplines";
import { Merits } from "./sections/Merits";
import { TheBlood } from "./sections/TheBlood";
import { Experience } from "./sections/Experience";
import { Profile } from "./sections/Profile";
import { ExportButton } from "./components/ExportButton";
import { ImportButton } from "./components/ImportButton";
import { CharacterTabs } from "./components/CharacterTabs";
import { RemoveSheetButton } from "./components/RemoveSheetButton";

type CharacterAction =
  | { type: "SET_CHARACTER"; payload: CharacterSheet }
  | { type: "UPDATE_FIELD"; payload: { key: string; value: any } }
  | { type: "UPDATE_NESTED_FIELD"; payload: { path: string[]; value: any } };

function characterReducer(
  state: CharacterSheet,
  action: CharacterAction,
): CharacterSheet {
  switch (action.type) {
    case "SET_CHARACTER":
      return action.payload;
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "UPDATE_NESTED_FIELD": {
      const { path, value } = action.payload;
      const newState = { ...state };
      let current: any = newState;

      // Navigate to the parent object
      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }

      // Set the final value
      current[path[path.length - 1]] = value;

      return newState;
    }
    default:
      return state;
  }
}

function App() {
  const [characterSheet, dispatch] = useReducer(
    characterReducer,
    EMPTY_CHARACTER,
  );
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);

  // Migrate old single sheet format to new multi-sheet format
  useEffect(() => {
    const oldSheet = localStorage.getItem("CHARACTER_SHEET");
    if (oldSheet) {
      try {
        const parsed = JSON.parse(oldSheet);
        const list = getCharacterSheetList();
        if (list.length === 0) {
          // Migrate old sheet to new format
          const newId = createNewCharacterSheet();
          saveCharacterSheetToLocalStorage(newId, parsed);
          setActiveSheetId(newId);
          dispatch({ type: "SET_CHARACTER", payload: parsed });
          // Remove old key
          localStorage.removeItem("CHARACTER_SHEET");
          return;
        }
      } catch (e) {
        console.error("Error migrating old sheet:", e);
      }
    }
  }, []);

  // Load active sheet on mount
  useEffect(() => {
    let sheetId = getActiveSheetId();

    // If no active sheet, try to get/create one
    if (!sheetId) {
      const list = getCharacterSheetList();
      if (list.length > 0) {
        sheetId = list[0];
      } else {
        sheetId = createNewCharacterSheet();
      }
    }

    const cachedCharacterSheet = getCharacterSheetFromLocalStorage(sheetId);
    if (cachedCharacterSheet) {
      setActiveSheetId(sheetId);
      dispatch({ type: "SET_CHARACTER", payload: cachedCharacterSheet });
    } else if (sheetId) {
      // Sheet ID exists but no data, load empty character
      setActiveSheetId(sheetId);
      dispatch({ type: "SET_CHARACTER", payload: EMPTY_CHARACTER });
    }
  }, []);

  // Load sheet when activeSheetId changes (user switches tabs)
  useEffect(() => {
    if (activeSheetId) {
      const cachedCharacterSheet =
        getCharacterSheetFromLocalStorage(activeSheetId);
      if (cachedCharacterSheet) {
        dispatch({ type: "SET_CHARACTER", payload: cachedCharacterSheet });
      } else {
        dispatch({ type: "SET_CHARACTER", payload: EMPTY_CHARACTER });
      }
    }
  }, [activeSheetId]);

  // Save character sheet when it changes
  useEffect(() => {
    if (activeSheetId && characterSheet) {
      debouncedSaveCharacterSheetToLocalStorage(activeSheetId, characterSheet);
    }
  }, [characterSheet, activeSheetId]);

  const updateField = useCallback((key: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", payload: { key, value } });
  }, []);

  const updateNestedField = useCallback((path: string[], value: any) => {
    dispatch({ type: "UPDATE_NESTED_FIELD", payload: { path, value } });
  }, []);

  const handleImport = useCallback(
    (importedCharacter: CharacterSheet) => {
      if (!activeSheetId) {
        const newId = createNewCharacterSheet();
        setActiveSheetId(newId);
        dispatch({ type: "SET_CHARACTER", payload: importedCharacter });
        saveCharacterSheetToLocalStorage(newId, importedCharacter);
      } else {
        dispatch({ type: "SET_CHARACTER", payload: importedCharacter });
        saveCharacterSheetToLocalStorage(activeSheetId, importedCharacter);
      }
    },
    [activeSheetId],
  );

  const handleSheetChange = useCallback(
    (id: string) => {
      if (id !== activeSheetId) {
        setActiveSheetId(id);
      }
    },
    [activeSheetId],
  );

  const handleSheetsUpdate = useCallback(() => {
    // Force reload of active sheet
    const sheetId = getActiveSheetId();
    if (sheetId) {
      const sheet = getCharacterSheetFromLocalStorage(sheetId);
      if (sheet) {
        setActiveSheetId(sheetId);
        dispatch({ type: "SET_CHARACTER", payload: sheet });
      }
    }
  }, []);

  const handleSheetDeleted = useCallback(() => {
    // Reload the new active sheet after deletion
    const sheetId = getActiveSheetId();
    if (sheetId) {
      const sheet = getCharacterSheetFromLocalStorage(sheetId);
      if (sheet) {
        setActiveSheetId(sheetId);
        dispatch({ type: "SET_CHARACTER", payload: sheet });
      }
    } else {
      // No sheets left, create a new one
      const newId = createNewCharacterSheet();
      setActiveSheetId(newId);
      dispatch({ type: "SET_CHARACTER", payload: EMPTY_CHARACTER });
    }
  }, []);

  return (
    <>
      <RemoveSheetButton
        activeSheetId={activeSheetId}
        onSheetDeleted={handleSheetDeleted}
      />
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <ExportButton characterSheet={characterSheet} />
        <ImportButton onImport={handleImport} />
      </div>
      <CharacterTabs
        activeSheetId={activeSheetId}
        onSheetChange={handleSheetChange}
        onSheetsUpdate={handleSheetsUpdate}
      />
      <h1 className="text-center text-xl mb-8 bg-[var(--background)] -m-7 px-6 w-fit mx-auto">
        <div className="uppercase text-5xl border-y w-fit mx-auto">Vampire</div>
        <div className="uppercase">The Masquerade</div>
        <div className="">Online Character Sheet</div>
      </h1>

      <main>
        <Overview
          name={characterSheet.name}
          clan={characterSheet.clan}
          predatorType={characterSheet.predatorType.name}
          updateField={updateField}
          updateNestedField={updateNestedField}
        />

        <Stats
          health={characterSheet.health}
          willpower={characterSheet.willpower}
          humanity={characterSheet.humanity}
          hunger={characterSheet.hunger}
          updateField={updateField}
          updateNestedField={updateNestedField}
        />

        <Attributes
          attributes={characterSheet.attributes}
          updateNestedField={updateNestedField}
        />

        <Skills
          characterSheetSkills={characterSheet.skills}
          updateField={updateNestedField}
        />

        <Disciplines
          disciplines={characterSheet.disciplines}
          updateField={updateNestedField}
        />

        <section className="pt-6">
          <h2 className="uppercase border-b mb-4 text-center">
            Merits & Flaws
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 md:gap-x-8 mb-3 gap-y-2">
            <Merits
              merits={characterSheet.merits}
              type="merit"
              field="merits"
              updateField={updateNestedField}
            />
            <Merits
              merits={characterSheet.flaws}
              type="flaw"
              field="flaws"
              updateField={updateNestedField}
            />
          </div>
        </section>

        <section className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 md:gap-x-8 mb-3 gap-y-2">
            <div className="lg:col-span-2">
              <h2 className="uppercase border-b mb-4 text-center">The Blood</h2>
              <TheBlood
                bloodPotency={characterSheet.bloodPotency}
                bloodSurge={characterSheet.bloodSurge}
                baneSeverity={characterSheet.baneSeverity}
                powerBonus={characterSheet.powerBonus}
                mendAmount={characterSheet.mendAmount}
                rouseReRoll={characterSheet.rouseReRoll}
                feedingPenalty={characterSheet.feedingPenalty}
                clanBane={characterSheet.clanBane}
                clanCompulsion={characterSheet.clanCompulsion}
                updateField={updateField}
              />
            </div>
            <div>
              <h2 className="uppercase border-b mb-4 text-center">
                Experience
              </h2>
              <Experience
                experience={characterSheet.experience}
                updateNestedField={updateNestedField}
              />
            </div>
          </div>
        </section>

        <section className="pt-6">
          <h2 className="uppercase border-b mb-4 text-center">Profile</h2>
          <Profile
            ambition={characterSheet.ambition}
            desire={characterSheet.desire}
            description={characterSheet.description}
            notes={characterSheet.notes}
            sire={characterSheet.sire}
            birthday={characterSheet.birthday}
            age={characterSheet.age}
            embraced={characterSheet.embraced}
            apparentAge={characterSheet.apparentAge}
            generation={characterSheet.generation}
            chronicleTenets={characterSheet.chronicleTenets}
            convictions={characterSheet.convictions}
            touchstonesText={characterSheet.touchstonesText}
            updateField={updateField}
          />
        </section>
      </main>
    </>
  );
}

export default App;
