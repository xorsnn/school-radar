import * as fs from "node:fs";

const GOV_SCHOOLS_RESOURCE_ID = "2ac19870-44f6-443d-a0c3-4c867f04c305";
const NON_GOV_SCHOOLS_RESOURCE_ID = "a5871783-7dd8-4b25-be9e-7d8b9b85422f";
const BASE_DATA_URL = "https://data.cese.nsw.gov.au/data";
const DATA_URL = `${BASE_DATA_URL}/api/3/action/datastore_search`;

type SchoolGender = "BOYS" | "GIRLS" | "COED";
type SchoolSelectiveness =
  | "FULLY_SELECTIVE"
  | "PARTLY_SELECTIVE"
  | "NOT_SELECTIVE";

type School = {
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


type SearchBootstrapSets = {
  affilationOptions: Set<string>;
  stateOptions: Set<string>;
  schoolScpecialityTypeOptions: Set<string>;
  levelOfSchoolingOptions: Set<string>;
  schoolSubtypeOptions: Set<string>;
  genderOptions: Set<string>;
  selectiveOptions: Set<string>;
  ownershipOptions: Set<string>;
};

type SearchBootstrap = {
  affilationOptions: string[];
  stateOptions: string[];
  schoolScpecialityTypeOptions: string[];
  levelOfSchoolingOptions: string[];
  schoolSubtypeOptions: string[];
  genderOptions: string[];
  selectiveOptions: string[];
  ownershipOptions: string[];
};

const emptyBootstrapSets = (): SearchBootstrapSets => {
  return {
    affilationOptions: new Set(),
    stateOptions: new Set(),
    schoolScpecialityTypeOptions: new Set(),
    levelOfSchoolingOptions: new Set(),
    schoolSubtypeOptions: new Set(),
    genderOptions: new Set(),
    selectiveOptions: new Set(),
    ownershipOptions: new Set(),
  };
};

const bootstrapSetsToBootstrap = (
  bootstrapSets: SearchBootstrapSets
): SearchBootstrap => {
  return {
    affilationOptions: Array.from(bootstrapSets.affilationOptions),
    stateOptions: Array.from(bootstrapSets.stateOptions),
    schoolScpecialityTypeOptions: Array.from(
      bootstrapSets.schoolScpecialityTypeOptions
    ),
    levelOfSchoolingOptions: Array.from(bootstrapSets.levelOfSchoolingOptions),
    schoolSubtypeOptions: Array.from(bootstrapSets.schoolSubtypeOptions),
    genderOptions: Array.from(bootstrapSets.genderOptions),
    selectiveOptions: Array.from(bootstrapSets.selectiveOptions),
    ownershipOptions: Array.from(bootstrapSets.ownershipOptions),
  };
};

const getSchoolGender = (entry: string): SchoolGender => {
  switch (entry) {
    case "Coed": {
      return "COED";
    }
    case "Co-ed": {
      return "COED";
    }
    case "Boys": {
      return "BOYS";
    }
    case "Male": {
      return "BOYS";
    }
    case "Girls": {
      return "GIRLS";
    }
    case "Female": {
      return "GIRLS";
    }
    default: {
      throw new Error(`${entry} is not handled`);
    }
  }
};

const getGovSchoolSelectiveness = (entry: string): SchoolSelectiveness => {
  switch (entry) {
    case "Not Selective": {
      return "NOT_SELECTIVE";
    }
    case "Selective": {
      return "FULLY_SELECTIVE";
    }
    case "Fully Selective": {
      return "FULLY_SELECTIVE";
    }
    case "Partially Selective": {
      return "PARTLY_SELECTIVE";
    }
    default: {
      throw new Error(`${entry} is not handled`);
    }
  }
};

const accessProp = (obj: object, str: string) => {
  return obj[str as keyof typeof obj];
};

const deserializeGovSchool = (entry: object): School => {
  return {
    gender: getSchoolGender(accessProp(entry, "School_gender")),
    selectiveness: getGovSchoolSelectiveness(
      accessProp(entry, "Selective_school")
    ),
    opportunityClass: accessProp(entry, "Opportunity_class") != "N",
    isGovernment: true,
    internalId: accessProp(entry, "_id"),
    name: accessProp(entry, "School_name"),
    suburb: accessProp(entry, "Town_suburb"),
    poscode: accessProp(entry, "Postcode"),
    state: "NSW",
    website: accessProp(entry, "website"),
    phone: accessProp(entry, "Phone"),
    latitude: accessProp(entry, "Latitude"),
    longtitude: accessProp(entry, "Longitude"),
    schoolAffilation: "N/A",
    systemic: "N/A",
    sector: "Government",
    levelOfSchooling: accessProp(entry, "Level_of_schooling"),
    schoolSubtype: accessProp(entry, "School_subtype"),
    schoolSpecialityType: accessProp(entry, "School_specialty_type"),
  };
};

const deserializeNonGovSchool = (entry: object): School => {
  return {
    gender: getSchoolGender(accessProp(entry, "school_gender")),
    selectiveness: "NOT_SELECTIVE",
    opportunityClass: false,
    isGovernment: false,
    internalId: accessProp(entry, "_id"),
    name: accessProp(entry, "school_name"),
    suburb: accessProp(entry, "town_suburb"),
    poscode: accessProp(entry, "postcode"),
    state: "NSW",
    website: accessProp(entry, "school_url"),
    phone: "-",
    latitude: accessProp(entry, "latitude"),
    longtitude: accessProp(entry, "longitude"),
    schoolAffilation: accessProp(entry, "school_affiliation"),
    systemic: accessProp(entry, "systemic"),
    sector: accessProp(entry, "Sector"),
    levelOfSchooling: accessProp(entry, "level_of_schooling"),
    schoolSubtype: "N/A",
    schoolSpecialityType: accessProp(entry, "school_specialty"),
  };
};

const getBaseLink = ({ resourceId }: { resourceId: string }) => {
  const params = {
    resource_id: resourceId,
  };
  const searchParams = new URLSearchParams(params);
  return `${DATA_URL}?${searchParams.toString()}`;
};

const getSchools = async ({
  resourceId,
  url,
}: {
  resourceId: string;
  url?: string;
}) => {
  const link = url || getBaseLink({ resourceId });
  const res = await fetch(link, {
    mode: "no-cors",
  });
  return await res.json();
};

const getAllSchools = async ({
  resourceId,
  deserializer,
}: {
  resourceId: string;
  deserializer: (obj: object) => School;
}): Promise<School[]> => {
  let res: School[] = [];
  let nextLink;
  let total = Infinity;
  let poll = true;
  while (poll) {
    const schoolsBufRes = await getSchools({
      resourceId,
      url: nextLink && `${BASE_DATA_URL}${nextLink}`,
    });
    const bufRecords = schoolsBufRes.result.records;
    res = [...res, ...bufRecords.map(deserializer)];
    nextLink = schoolsBufRes.result._links.next;
    total = Math.min(schoolsBufRes.result.total, total);
    if (res.length >= total) poll = false;
  }
  return res;
};

const saveSchoolsToFile = async ({
  schools,
  resFile,
}: {
  schools: School[];
  resFile: string;
}) => {
  if (!fs.existsSync("./data")) {
    fs.mkdir("./data", { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
  fs.writeFile(
    `./data/${resFile}`,
    JSON.stringify(schools, undefined, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${resFile} saved!`);
      }
    }
  );
};

const composeBootstrap = ({
  schools,
  resFile,
}: {
  schools: School[];
  resFile: string;
}) => {
  const bootstrapSets: SearchBootstrapSets = schools.reduce(
    (acc: SearchBootstrapSets, val: School): SearchBootstrapSets => {
      return {
        affilationOptions: acc.affilationOptions.add(val.schoolAffilation),
        stateOptions: acc.stateOptions.add(val.state),
        schoolScpecialityTypeOptions: acc.schoolScpecialityTypeOptions.add(
          val.schoolSpecialityType
        ),
        levelOfSchoolingOptions: acc.levelOfSchoolingOptions.add(
          val.levelOfSchooling
        ),
        schoolSubtypeOptions: acc.schoolSubtypeOptions.add(val.schoolSubtype),
        genderOptions: acc.genderOptions.add(val.gender),
        selectiveOptions: acc.selectiveOptions.add(val.selectiveness),
        ownershipOptions: acc.ownershipOptions.add(
          val.isGovernment ? "Government" : "Non Government"
        ),
      };
    },
    emptyBootstrapSets()
  );

  const bootstrap = bootstrapSetsToBootstrap(bootstrapSets);
  if (!fs.existsSync("./data")) {
    fs.mkdir("./data", { recursive: true }, (err) => {
      if (err) throw err;
    });
  }
  fs.writeFile(
    `./data/${resFile}`,
    JSON.stringify(bootstrap, undefined, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${resFile} saved!`);
      }
    }
  );
};

const main = async () => {
  const govSchools = await getAllSchools({
    resourceId: GOV_SCHOOLS_RESOURCE_ID,
    deserializer: deserializeGovSchool,
  });
  saveSchoolsToFile({
    schools: govSchools,
    resFile: "gov_schools.json",
  });
  const nonGovSchools = await getAllSchools({
    resourceId: NON_GOV_SCHOOLS_RESOURCE_ID,
    deserializer: deserializeNonGovSchool,
  });
  saveSchoolsToFile({
    schools: nonGovSchools,
    resFile: "non_gov_schools.json",
  });
  composeBootstrap({
    schools: govSchools.concat(nonGovSchools),
    resFile: "bootsrap.json",
  });
};

main();

export {};
