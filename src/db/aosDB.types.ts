export interface DB {
  units: Unit[];
  armies: SubObject<Army>;
  universal: Universal[];
}

type SubObject<V> = { [key: string]: V };

export interface Unit {
  name: string;
  id: string;
  type: number; // Enum? Need to figure out what this represents. 6=Manifestation? 2=Army?
  superType: string; // Enum? Supertypes seem -> "Unit" "Other"
  points: number;
  legends: boolean;
  health: string;
  save: string;
  move: string;
  control: string | null;
  ward: string;
  banishment: string;
  isUndersize: boolean;
  isWarmaster: boolean;
  isGeneral: boolean;
  canBeReinforced: boolean;
  isReinforced: boolean;
  models: Model[];
  enhancements: SubObject<Enhancement>;
  abilities: Ability[];
  keywords: string[];
  optionSets: []; // Needs info
  battleProfile: null; // Needs info
  rules: []; // Needs info
  _tags: string[];
}

export interface Model {
  id: string;
  name: string;
  min: number;
  max: number;
  baseSize: string;
  weapons: {
    selected: SubObject<number>;
    basic: SubObject<WeaponInfo>;
    advanced: SubObject<WeaponInfo>;
  };
  optionSets: OptionSet[];
}

export interface WeaponInfo {
  id: string;
  name: string;
  min: 0;
  max: 1;
  per: string; //Enum? Seen "Model"
  replaces: string[]; // weapon name
  _replacedBy: string[]; // weapon id
  weapons: Weapon[];
}

export interface Weapon {
  id: string;
  name: string;
  type: number; // Enum?
  range: string | null;
  attack: string;
  hit: string;
  wound: string;
  rend: string;
  damage: string;
  abilities: string[];
}

export interface Ability {
  name: string;
  id: string;
  type: 0; //Enum? Seen 0
  superType: string;
  timing: string;
  color: string; //enum?
  typeAttribute: string; //enum?
  effect: string;
  declare: string | null;
  usedBy: string | null; // Needs info, string?
  cost: string | null;
  unlockCondition: string | null; // Needs info, string?
  keywords: string[]; // Assuming
}

export interface Enhancement {
  name: string;
  id: string;
  slot: null;
}

export interface OptionSet {
  name: string;
  options: Weapon & { points: number }[];
  selection: string | null; // string assumed, pointing to the selection?
}

export interface Army {
  id: string;
  name: string;
  type: number;
  superType: string;
  revision: number;
  keyword: string;
  alliance: string; // enum?
  isArmyOfRenown: false;
  units: Unit[];
  upgrades: []; // TODO
  regimentsOfRenown: []; //TODO
  options: []; //TODO
  legends: boolean;
  paths: []; //TODO
}

export interface Universal {
  name: string;
  id: string;
  type: number;
  superType: string;
  points: number;
  sog: boolean;
  unitIds: string[];
  units: Unit[];
  abilities: Ability[]
  rules: []; //TODO
}
