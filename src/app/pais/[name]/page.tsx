import { getCountryBordersByName } from "@/app/utils/getCountryBordersByName";
import { getCountryByName } from "@/app/utils/getCountryByName";
import CountryCard from "@/components/CountryCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// se quiser que SSG basta tirar o comentário
// export async function generateStaticParams(){
//   const countries= await getCountries();
//   const countriesNames = countries.map((country)=>({name:country.name.common}))
//   return countriesNames
// }

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(
    decodeURI(name),
  );

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <section className="container flex flex-col">
      <h1 className="my-16 text-center text-5xl font-bold text-gray-800">
        {country?.translations?.por?.common}
      </h1>
      <Link href="/" className="flex w-fit items-center py-2 ">
        <span className="text-xl"> ⬅ </span> Voltar
      </Link>
      <article className="flex min-w-full flex-col justify-between rounded-xl bg-white p-10 lg:flex-row ">
        <section className="flex max-h-44 min-h-full flex-col justify-between">
          {country?.capital && (
            <h2 className="text-xl  text-gray-800">
              <b>🏙️ Capital: </b>
              {country?.capital}
            </h2>
          )}
          <h2 className="text-xl  text-gray-800">
            <b> 🗺️ Continente: </b> {country?.region}{" "}
            {country?.subregion && ` - ${country?.subregion}`}
          </h2>
          <h2 className="text-xl  text-gray-800">
            <b>👨‍👩‍👧‍👦 População:</b> {formatter.format(country?.population)}
          </h2>
          {country?.languages && (
            <h2 className="flex max-w-lg flex-wrap items-center text-xl text-gray-800 ">
              <b> 🗣️ Línguas faladas:</b>
              <div className="flex flex-wrap gap-1">
                {Object?.values(country?.languages)?.map((language) => (
                  <span
                    key={language}
                    className="inline-block rounded-full bg-indigo-700 px-2 text-sm text-white"
                  >
                    {language}
                  </span>
                )) ?? "Error"}
              </div>
            </h2>
          )}
        </section>
        <div className="relative order-first my-2 h-48 w-96 max-w-full self-center   lg:order-last">
          <Image
            src={country?.flags?.svg}
            alt={
              country?.flags?.alt ??
              `Bandeira do pais ${country.translations.por.common}`
            }
            fill
            className="object-fill shadow-lg"
          />
        </div>
      </article>
      <section>
        <h3
          className="mt-12
     text-2xl font-semibold text-gray-800 "
        >
          Países que fazem fronteira
        </h3>
        {country?.borders && (
          <div className="mt-3 grid h-full grid-cols-1 justify-center gap-2 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-5">
            {borderCountries?.map((border) => (
              <React.Fragment key={border?.name}>
                <CountryCard {...border} />
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
