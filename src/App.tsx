import { useEffect, useReducer, useCallback } from "react";
import { type CharacterSheet } from "./types";
import { EMPTY_CHARACTER } from "./emptyCharacter";
import {
  debouncedSaveCharacterSheetToLocalStorage,
  getCharacterSheetFromLocalStorage,
} from "./utils/localStorage";
import { ThreeColRow } from "./components/ThreeColRow";
import { Dots } from "./components/Dots";
import { DamageTracker } from "./components/DamageTracker";
import { Skills } from "./sections/Skills";
import { Overview } from "./sections/Overview";
import { Attributes } from "./sections/Attributes";

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

  useEffect(() => {
    const cachedCharacterSheet = getCharacterSheetFromLocalStorage();
    if (cachedCharacterSheet) {
      dispatch({ type: "SET_CHARACTER", payload: cachedCharacterSheet });
    }
  }, []);

  useEffect(() => {
    debouncedSaveCharacterSheetToLocalStorage(characterSheet);
  }, [characterSheet]);

  const updateField = useCallback((key: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", payload: { key, value } });
  }, []);

  const updateNestedField = useCallback((path: string[], value: any) => {
    dispatch({ type: "UPDATE_NESTED_FIELD", payload: { path, value } });
  }, []);

  return (
    <>
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
                  updateNestedField(["health", "totalDots"], value)
                }
              />
              <DamageTracker
                totalPossible={15}
                groupBy={5}
                damage={characterSheet.health.damage}
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
                filledDots={characterSheet.willpower.totalDots}
                handleChange={(value) =>
                  updateNestedField(["willpower", "totalDots"], value)
                }
              />

              <DamageTracker
                totalPossible={15}
                groupBy={5}
                damage={characterSheet.willpower.damage}
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
                filledDots={characterSheet.humanity}
                handleChange={(value) => updateField("humanity", value)}
              />
            </div>
          </ThreeColRow>
        </div>

        <Attributes
          attributes={characterSheet.attributes}
          updateNestedField={updateNestedField}
        />

        <Skills
          characterSheetSkills={characterSheet.skills}
          updateField={updateNestedField}
        />
      </main>
    </>
  );
}

export default App;
