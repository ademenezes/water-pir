import { BRAZIL } from "./brazil";
import type { CountryProfile } from "../src/types";

export const COUNTRIES: Record<string, CountryProfile> = {
  BRA: BRAZIL,
};

export function getCountry(code: string): CountryProfile | undefined {
  return COUNTRIES[code.toUpperCase()];
}

export function listCountries(): CountryProfile[] {
  return Object.values(COUNTRIES);
}
