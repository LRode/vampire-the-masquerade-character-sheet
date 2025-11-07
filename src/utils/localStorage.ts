import { EMPTY_CHARACTER } from "../emptyCharacter";
import type { CharacterSheet } from "../types";
import { debounce } from "./debounce";

const SHEET_LIST_KEY = "CHARACTER_SHEET_LIST";
const ACTIVE_SHEET_KEY = "ACTIVE_CHARACTER_SHEET_ID";

const getSheetKey = (id: string) => `CHARACTER_SHEET_${id}`;

export const getCharacterSheetList = (): string[] => {
  try {
    const list = localStorage.getItem(SHEET_LIST_KEY);
    return list ? JSON.parse(list) : [];
  } catch (e) {
    console.error("Error getting character sheet list:", e);
    return [];
  }
};

export const saveCharacterSheetList = (list: string[]) => {
  try {
    localStorage.setItem(SHEET_LIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error saving character sheet list:", e);
  }
};

export const getActiveSheetId = (): string | null => {
  try {
    return localStorage.getItem(ACTIVE_SHEET_KEY);
  } catch (e) {
    console.error("Error getting active sheet ID:", e);
    return null;
  }
};

export const setActiveSheetId = (id: string) => {
  try {
    localStorage.setItem(ACTIVE_SHEET_KEY, id);
  } catch (e) {
    console.error("Error setting active sheet ID:", e);
  }
};

export const getCharacterSheetFromLocalStorage = (
  id?: string,
): CharacterSheet | null => {
  try {
    const sheetId = id || getActiveSheetId();
    if (!sheetId) {
      return null;
    }
    const characterSheet = localStorage.getItem(getSheetKey(sheetId));
    return characterSheet ? JSON.parse(characterSheet) : null;
  } catch (e) {
    console.error("Error getting character sheet:", e);
    return null;
  }
};

export const getAllCharacterSheets = (): Record<string, CharacterSheet> => {
  const list = getCharacterSheetList();
  const sheets: Record<string, CharacterSheet> = {};
  list.forEach((id) => {
    const sheet = getCharacterSheetFromLocalStorage(id);
    if (sheet) {
      sheets[id] = sheet;
    }
  });
  return sheets;
};

const saveFormToLocalStorage = (id: string, form: CharacterSheet) => {
  try {
    localStorage.setItem(getSheetKey(id), JSON.stringify(form));
  } catch (e) {
    console.error("Error saving character sheet:", e);
  }
};

export const saveCharacterSheetToLocalStorage = (
  id: string,
  form: CharacterSheet,
) => {
  saveFormToLocalStorage(id, form);
};

export const createNewCharacterSheet = (): string => {
  const id = `sheet_${Date.now()}`;
  const list = getCharacterSheetList();
  list.push(id);
  saveCharacterSheetList(list);
  saveCharacterSheetToLocalStorage(id, EMPTY_CHARACTER);
  setActiveSheetId(id);
  return id;
};

export const deleteCharacterSheet = (id: string) => {
  try {
    const list = getCharacterSheetList();
    const filteredList = list.filter((sheetId) => sheetId !== id);
    saveCharacterSheetList(filteredList);
    localStorage.removeItem(getSheetKey(id));

    // If this was the active sheet, switch to another one or clear active
    const activeId = getActiveSheetId();
    if (activeId === id) {
      if (filteredList.length > 0) {
        setActiveSheetId(filteredList[0]);
      } else {
        localStorage.removeItem(ACTIVE_SHEET_KEY);
      }
    }
  } catch (e) {
    console.error("Error deleting character sheet:", e);
  }
};

export const debouncedSaveCharacterSheetToLocalStorage = (
  id: string,
  form: CharacterSheet,
) => {
  const debouncedSave = debounce(saveFormToLocalStorage, 3000);
  debouncedSave(id, form);
};
