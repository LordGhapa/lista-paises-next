import textCleaner from "@/app/utils/textCleaner";
import { Country } from "@/types";
import OptionsLanguage from "../optionsLanguage";
import OptionsContinent from "../optionsContinent";
import { Dispatch, SetStateAction } from "react";

type SearchInputsProps = {
  countries: Country[];
  search: string;
  searchByLanguage: string;
  searchByContinent: string;
  setData: Dispatch<SetStateAction<Country[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchByLanguage: Dispatch<SetStateAction<string>>;
  setSearchByContinent: Dispatch<SetStateAction<string>>;
};

export default function SearchInputs({
  countries,
  search,
  searchByLanguage,
  searchByContinent,
  setData,
  setSearch,
  setSearchByLanguage,
  setSearchByContinent,
}: SearchInputsProps) {
  const handleFilterSearch = (value: string) => {
    if (value === "") return countries;
    const filtedInfo = countries.filter((country: Country) =>
      textCleaner(country.translations.por.common).includes(
        textCleaner(value.trim()),
      ),
    );
    return filtedInfo;
  };

  const handleFilterSearchByLanguage = (info: Country[], value: string) => {
    if (value === "") return info;
    let filteredByLanguage = info.filter((country: Country) => {
      let valorData = Object.values(country.languages ?? []);
      return valorData.indexOf(value) !== -1;
    });
    return filteredByLanguage;
  };

  const handleFilterContinent = (info: Country[], value: string) => {
    if (value === "") return info;
    const filtedInfo = info.filter((country: Country) => {
      return textCleaner(country.region).includes(textCleaner(value.trim()));
    });
    return filtedInfo;
  };

  function handleFilter() {
    const filtedSearch = handleFilterSearch(search);
    const filtedLanguage = handleFilterSearchByLanguage(
      filtedSearch,
      searchByLanguage,
    );
    const filtedContinent = handleFilterContinent(
      filtedLanguage,
      searchByContinent,
    );
    setData(filtedContinent);
  }

  const resetSearch = () => {
    setSearch("");
    setSearchByLanguage("");
    setSearchByContinent("");
    setData(countries);
  };

  return (
    <div className="mt-5 flex items-center gap-5 rounded-md bg-gray-400 p-4 shadow-lg ">
      <span className="font-bold dark:text-black">Filtrar por:</span>
      <form
        className="flex items-center gap-5"
        onSubmit={(e) => {
          {
            e.preventDefault();
            handleFilter();
          }
        }}
      >
        <label className="font-bold dark:text-black" htmlFor="name">
          Nome:
        </label>
        <input
          autoComplete="off"
          id="name"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-100 p-2 text-black  hover:open:bg-red-500 dark:bg-gray-800  dark:text-white "
        />
        <label htmlFor="language" className="font-bold dark:text-black">
          Idioma:
        </label>
        <input
          className="p-2 dark:bg-gray-800 dark:text-white "
          list="languages"
          id="language"
          value={searchByLanguage}
          onChange={(e) => setSearchByLanguage(e.target.value)}
        />
        <datalist id="languages">
          <OptionsLanguage />
        </datalist>

        <label className="font-bold dark:text-black" htmlFor="continent">
          Continente:
        </label>
        <select
          id="continent"
          className="p-2 dark:bg-gray-800 dark:text-white"
          value={searchByContinent}
          onChange={(e) => setSearchByContinent(e.target.value)}
        >
          <option value="">Selecione uma opção</option>
          <OptionsContinent />
        </select>
        <input
          className="rounded-md bg-slate-200 p-2 dark:text-black"
          type="submit"
          value="Filtrar"
        />
        <input
          className="rounded-md bg-slate-200 p-2 dark:text-black"
          type="reset"
          value="Limpar"
          onClick={resetSearch}
        />
      </form>
    </div>
  );
}
