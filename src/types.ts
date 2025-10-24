export type CharacterSheet = {
  name: string;
  chronicle: string;
  description: string;
  sire: string;
  clan: string;
  predatorType: PredatorType;
  ambition: string;
  sect: string;
  generation: number;
  desire: string;
  touchstones: Touchstone[];
  attributes: Record<Attribute, number>;
  skills: Record<Skill, number>;
  skillSpecialties: SkillSpecialty[];
  disciplines: Disciplines[];
  bloodPotency: number;
  health: {
    totalDots: number;
    superficial: number;
    aggravated: number;
  };
  willpower: {
    totalDots: number;
    superficial: number;
    aggravated: number;
  };
  humanity: number;
  merits: Merit[];
  flaws: Flaw[];
  haven: Haven;
  hunger: number;
  clanBane: string;
  clanCompulsion: string;
  bloodSurge: string;
  baneSeverity: string;
  birthday: string;
  age: number;
  embraced: string;
  apparentAge: number;
  notes: string;
  concept: string;
  experience: {
    total: number;
    spent: number;
  };
  history: string;
};

export enum Attribute {
  Strength = "strength",
  Charisma = "charisma",
  Intelligence = "intelligence",
  Dexterity = "dexterity",
  Manipulation = "manipulation",
  Wits = "wits",
  Stamina = "stamina",
  Composure = "composure",
  Resolve = "resolve",
}

export enum Skill {
  Athletics = "athletics",
  Brawl = "brawl",
  Craft = "craft",
  Drive = "drive",
  Firearms = "firearms",
  Melee = "melee",
  Larceny = "larceny",
  Stealth = "stealth",
  Survival = "survival",
  AnimalKen = "animal ken",
  Etiquette = "etiquette",
  Insight = "insight",
  Intimidation = "intimidation",
  Leadership = "leadership",
  Performance = "performance",
  Persuasion = "persuasion",
  Streetwise = "streetwise",
  Subterfuge = "subterfuge",
  Academics = "academics",
  Awareness = "awareness",
  Finance = "finance",
  Investigation = "investigation",
  Medicine = "medicine",
  Occult = "occult",
  Politics = "politics",
  Science = "science",
  Technology = "technology",
}

export enum Discipline {
  Auspex = "auspex",
  Celerity = "celerity",
  Presence = "presence",
}

export type SkillSpecialty = {
  skill: Skill;
  name: string;
};

export type Merit = {
  name: string;
  level: number;
  type: "merit";
  summary: string;
};

export type Flaw = {
  name: string;
  level: number;
  type: "flaw";
  summary: string;
};

export type PredatorType = {
  name: string;
  pickedDiscipline: string;
  pickedSpecialties: SkillSpecialty[];
  pickedMeritsAndFlaws: Array<Merit | Flaw>;
};

export type Touchstone = {
  name: string;
  description: string;
  conviction: string;
};

export type Ability = {
  name: string;
  summary: string;
};

export type Disciplines = {
  name: Discipline;
  dots: number;
  abilities: Ability[];
};

export type Haven = {
  name: string;
  rating: number;
  merits: Merit[];
  flaws: Flaw[];
};
