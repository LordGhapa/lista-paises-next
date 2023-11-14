import { Country } from "@/types";
import { getCountries } from "./getCountries";

export async function getCountryByName(name: string): Promise<Country> {
  const countries = await getCountries();
  const countryData = countries.find(
    (country: Country) => country.name.common === name.replace("%2C", ","),
  );
  if (!countryData) throw new Error("Country not found");
  return countryData;
}
