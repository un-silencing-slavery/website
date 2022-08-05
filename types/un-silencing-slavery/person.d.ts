type SortKey =
  | "name"
  | "age"
  | "gender"
  | "colour"
  | "matrilineage"
  | "nativity"
  | "duties";

type ClusterKey = "gender" | "colour" | "nativity" | "duties";

type DutyCategory =
  | "Craft Workers"
  | "Livestock Workers"
  | "Domestic Workers"
  | "Craft Workers"
  | "Field Workers"
  | "“Not at Work”"
  | "Unknown";

interface Person {
  personId: string;
  name: string;
  country: string;
  colour: string;
  gender: string;
  motherId: string | null;
  displayName: string;
  profile: string;
  dutyCategory: DutyCategory;
  arrivalYear: number;
  birthYear: number;
  exitYear: number;
  personSlug: string;
  isMother: boolean;
  isGrandmother: boolean;
  isGreatgrandmother: boolean;
}
