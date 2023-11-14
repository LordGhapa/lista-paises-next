import { Country } from "@/types";
async function fetchWithTimeout(resource:any, options:any = {}) {
  const { timeout = 10000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export async function getCountries(): Promise<Country[]> {
  const res = await fetchWithTimeout("https://restcountries.com/v3.1/all");
  return res.json();
}