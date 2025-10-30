export type CharacterSheet = {
  name: string;
  chronicle: string;
  description: string;
  player: string;
  sire: string;
  clan: string;
  predatorType: PredatorType;
  ambition: string;
  sect: string;
  generation: number;
  desire: string;
  touchstones: Touchstone[];
  attributes: Record<Attribute, number>;
  skills: Record<Skill, SkillRecord>;
  skillSpecialties: SkillSpecialty[];
  disciplines: Disciplines[];
  bloodPotency: number;
  health: {
    totalDots: number;
    damage: Damage[];
  };
  willpower: {
    totalDots: number;
    damage: Damage[];
  };
  humanity: number;
  merits: Merit[];
  flaws: Merit[];
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

export const ATTRIBUTE = {
  Strength: "strength",
  Charisma: "charisma",
  Intelligence: "intelligence",
  Dexterity: "dexterity",
  Manipulation: "manipulation",
  Wits: "wits",
  Stamina: "stamina",
  Composure: "composure",
  Resolve: "resolve",
} as const;

export type Attribute = (typeof ATTRIBUTE)[keyof typeof ATTRIBUTE];

export const SKILL = {
  Athletics: "athletics",
  Brawl: "brawl",
  Craft: "craft",
  Drive: "drive",
  Firearms: "firearms",
  Melee: "melee",
  Larceny: "larceny",
  Stealth: "stealth",
  Survival: "survival",
  AnimalKen: "animal ken",
  Etiquette: "etiquette",
  Insight: "insight",
  Intimidation: "intimidation",
  Leadership: "leadership",
  Performance: "performance",
  Persuasion: "persuasion",
  Streetwise: "streetwise",
  Subterfuge: "subterfuge",
  Academics: "academics",
  Awareness: "awareness",
  Finance: "finance",
  Investigation: "investigation",
  Medicine: "medicine",
  Occult: "occult",
  Politics: "politics",
  Science: "science",
  Technology: "technology",
} as const;

export type Skill = (typeof SKILL)[keyof typeof SKILL];

export type SkillRecord = {
  dots: number;
  specialty?: string;
};

// export const DISCIPLINE = {
//   Auspex: "auspex",
//   Celerity: "celerity",
//   Presence: "presence",
// } as const;

// export type Discipline = (typeof DISCIPLINE)[keyof typeof DISCIPLINE];

export const DAMAGE_TYPE = {
  Superficial: "superficial",
  Aggravated: "aggravated",
} as const;

export type DamageType = (typeof DAMAGE_TYPE)[keyof typeof DAMAGE_TYPE];

export type Damage = { type: DamageType };

export type SkillSpecialty = {
  skill: Skill;
  name: string;
};

export type Merit = {
  name: string;
  dots: number;
  type: "merit" | "flaw";
  summary: string;
};

export type PredatorType = {
  name: string;
  pickedDiscipline: string;
  pickedSpecialties: SkillSpecialty[];
  pickedMeritsAndFlaws: Array<Merit>;
};

export type Touchstone = {
  name: string;
  description: string;
  conviction: string;
};

export type Ability = {
  name: string;
  cost: string;
  dicePools: string;
  duration: string;
  summary: string;
  level: number;
};

export type Disciplines = {
  name: string;
  dots: number;
  abilities: Ability[];
};

export type Haven = {
  name: string;
  rating: number;
  merits: Merit[];
  flaws: Merit[];
};
