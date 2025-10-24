import { EMPTY_CHARACTER } from "../emptyCharacter";
import type { CharacterSheet } from "../types";
import { debounce } from "./debounce";

export const getCharacterSheetFromLocalStorage = (): CharacterSheet => {
  try {
    const characterSheet = localStorage.getItem("CHARACTER_SHEET");
    return characterSheet && JSON.parse(characterSheet);
  } catch (e) {
    alert(e);
  }

  console.log(
    "Could not find a valid character saved in localStorage. Loading empty character",
  );
  return EMPTY_CHARACTER;
};

const saveFormToLocalStorage = (form: CharacterSheet) => {
  console.log("saveForm", form);
  localStorage.setItem("CHARACTER_SHEET", JSON.stringify(form));
};

export const debouncedSaveCharacterSheetToLocalStorage = debounce(
  saveFormToLocalStorage,
  5000,
);
