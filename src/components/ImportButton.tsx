import { useRef } from "react";
import { Button } from "./Button";
import type { CharacterSheet } from "../types";

export const ImportButton = ({
  onImport,
}: {
  onImport: (characterSheet: CharacterSheet) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateCharacterSheet = (data: any): data is CharacterSheet => {
    // Basic validation - check for required top-level fields
    if (!data || typeof data !== "object") {
      return false;
    }

    // Check for essential fields that should exist in a CharacterSheet
    const requiredFields = [
      "name",
      "attributes",
      "skills",
      "health",
      "willpower",
      "disciplines",
      "merits",
      "flaws",
      "predatorType",
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        return false;
      }
    }

    // Validate nested structures
    if (
      !data.health ||
      typeof data.health !== "object" ||
      !Array.isArray(data.health.damage)
    ) {
      return false;
    }

    if (
      !data.willpower ||
      typeof data.willpower !== "object" ||
      !Array.isArray(data.willpower.damage)
    ) {
      return false;
    }

    if (!Array.isArray(data.disciplines)) {
      return false;
    }

    if (!Array.isArray(data.merits)) {
      return false;
    }

    if (!Array.isArray(data.flaws)) {
      return false;
    }

    if (
      !data.predatorType ||
      typeof data.predatorType !== "object" ||
      !Array.isArray(data.predatorType.pickedSpecialties) ||
      !Array.isArray(data.predatorType.pickedMeritsAndFlaws)
    ) {
      return false;
    }

    return true;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string;
        const parsedData = JSON.parse(jsonContent);

        if (!validateCharacterSheet(parsedData)) {
          alert(
            "Invalid character sheet format. The file does not match the expected structure.",
          );
          return;
        }

        // Confirm with user before overwriting
        const confirmed = window.confirm(
          "This will overwrite your current character sheet. Are you sure you want to continue?",
        );

        if (confirmed) {
          onImport(parsedData);
          alert("Character sheet imported successfully!");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert(
          "Failed to parse the JSON file. Please make sure it's a valid JSON file.",
        );
      }
    };

    reader.onerror = () => {
      alert("Failed to read the file. Please try again.");
    };

    reader.readAsText(file);

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <Button onClick={handleClick} className="px-4 py-2">
        Import
      </Button>
    </>
  );
};
