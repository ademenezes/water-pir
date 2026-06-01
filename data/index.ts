import { BRAZIL } from "./brazil";
import { GEORGIA } from "./georgia";
import type { CountryProfile } from "../src/types";

export const COUNTRIES: Record<string, CountryProfile> = {
  BRA: BRAZIL,
  GEO: GEORGIA,
};

export function getCountry(code: string): CountryProfile | undefined {
  return COUNTRIES[code.toUpperCase()];
}

export function listCountries(): CountryProfile[] {
  return Object.values(COUNTRIES);
}
