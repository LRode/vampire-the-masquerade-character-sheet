import { Button } from "./Button";
import {
  deleteCharacterSheet,
  getCharacterSheetList,
} from "../utils/localStorage";

export const RemoveSheetButton = ({
  activeSheetId,
  onSheetDeleted,
}: {
  activeSheetId: string | null;
  onSheetDeleted: () => void;
}) => {
  const handleRemove = () => {
    if (!activeSheetId) {
      return;
    }

    const sheetList = getCharacterSheetList();
    if (sheetList.length <= 1) {
      alert(
        "Cannot delete the last character sheet. Please create a new one first.",
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this character sheet? This action cannot be undone.",
    );

    if (confirmed) {
      deleteCharacterSheet(activeSheetId);
      onSheetDeleted();
    }
  };

  const sheetList = getCharacterSheetList();
  const canDelete = sheetList.length > 1 && activeSheetId !== null;

  return (
    <div className="absolute right-4 top-4 z-10">
      <Button
        onClick={handleRemove}
        disabled={!canDelete}
        className="px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Remove Sheet
      </Button>
    </div>
  );
};
