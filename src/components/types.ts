// In types.ts
export type Country = {
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { official: string; common: string } };
  };
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  borders: string[];
  tld: string[];
  cca3: string;
};
      