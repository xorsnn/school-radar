type SchoolGender = "BOYS" | "GIRLS" | "COED";
type SchoolSelectiveness =
  | "FULLY_SELECTIVE"
  | "PARTLY_SELECTIVE"
  | "NOT_SELECTIVE";

export type School = {
  gender: SchoolGender;
  selectiveness: SchoolSelectiveness;
  opportunityClass: boolean;
  isGovernment: boolean;
  internalId: number;
  name: string;
  suburb: string;
  poscode: string;
  state: string;
  website?: string | null;
  phone: string;
  latitude: string;
  longtitude: string;
  schoolAffilation: string;
  systemic: string;
  sector: string;
  levelOfSchooling: string;
  schoolSubtype: string;
  schoolSpecialityType: string;
};
