import { useState, useEffect } from "react";
import { Button } from "./Button";
import {
  getCharacterSheetList,
  getAllCharacterSheets,
  createNewCharacterSheet,
  setActiveSheetId,
} from "../utils/localStorage";

export const CharacterTabs = ({
  activeSheetId,
  onSheetChange,
  onSheetsUpdate,
}: {
  activeSheetId: string | null;
  onSheetChange: (id: string) => void;
  onSheetsUpdate: () => void;
}) => {
  const [, setRefreshKey] = useState(0);

  // Refresh periodically to pick up changes
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((k) => k + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sheetList = getCharacterSheetList();
  const allSheets = getAllCharacterSheets();

  const handleAddSheet = () => {
    const newId = createNewCharacterSheet();
    setRefreshKey((k) => k + 1);
    onSheetsUpdate();
    onSheetChange(newId);
  };

  const handleSwitchSheet = (id: string) => {
    setActiveSheetId(id);
    onSheetChange(id);
  };

  return (
    <div className="md:fixed md:left-4 md:top-20 flex flex-row md:flex-col gap-2 z-10 md:max-h-[calc(100vh-120px)] md:overflow-y-auto mb-12 mt-4 md:mt-0 md:mb-0 px-4 md:px-0">
      {sheetList.map((id) => {
        const sheet = allSheets[id];
        const displayName = sheet?.name?.trim() || `Sheet ${id.slice(-4)}`;
        const isActive = activeSheetId === id;

        return (
          <Button
            key={id}
            variant="secondary"
            onClick={() => handleSwitchSheet(id)}
            className={`px-1 py-2 text-sm whitespace-nowrap ${
              isActive
                ? "opacity-100 ring-2 ring-[var(--surface)]"
                : "opacity-70 hover:opacity-90"
            }`}
          >
            {displayName}
          </Button>
        );
      })}
      <Button
        variant="secondary"
        onClick={handleAddSheet}
        className="px-3 py-2 text-sm opacity-70 hover:opacity-90"
      >
        + New
      </Button>
    </div>
  );
};
