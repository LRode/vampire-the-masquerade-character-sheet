import { Button } from "./Button";
import type { CharacterSheet } from "../types";

export const ExportButton = ({
  characterSheet,
}: {
  characterSheet: CharacterSheet;
}) => {
  const handleExport = () => {
    try {
      const jsonString = JSON.stringify(characterSheet, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Use the character name for the filename, or "unnamed" if empty
      const name = characterSheet.name.trim() || "unnamed";
      // Sanitize the name to be filesystem-safe
      const sanitizedName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      link.download = `vtm-character_${sanitizedName}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting character sheet:", error);
      alert("Failed to export character sheet. Please try again.");
    }
  };

  return (
    <Button onClick={handleExport} className="px-4 py-2">
      Export
    </Button>
  );
};
