import { Country } from "@/types";
import { getCountries } from "./getCountries";

export async function getCountryBordersByName(name: string) {
  const countries = await getCountries();
  const country = countries.find(
    (country: Country) => country.name.common === name.replace("%2C", ","),
  )!;
  return country?.borders?.map((border) => {
    const borderCountry = countries.find((r) => r.cca3 === border)!;
    return {
      name: borderCountry?.name.common,
      ptName: borderCountry?.translations.por.common,
      flag: borderCountry?.flags.svg,
      flagAlt: borderCountry?.flags.alt,
    };
  });
}
