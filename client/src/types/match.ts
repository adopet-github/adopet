import type { Adopter } from "./adopter";
import type { Pet } from "./animal";

export type Match = {
  animal: Pet,
  adopter: Adopter,
  date: Date,
};
