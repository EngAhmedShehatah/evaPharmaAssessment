import {I_Country} from "../country/country.modal";

export interface I_City {
  id: number;
  name: string;
  countryId: number;
  country: I_Country ;
}
