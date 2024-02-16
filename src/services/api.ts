import { govSchools } from "services/gov_schools";
import { nonGovSchools } from "services/non_gov_school";
import { School } from "services/school";
import { SearchConfigState } from "utils/search_config_presenter";

export const getAllSchools = (): School[] => {
  return [...govSchools, ...nonGovSchools];
};

export const searchSchools = (searchConfig: SearchConfigState): School[] => {
  const {
    schoolAffiliation,
    levelOfSchooling,
    schoolSubtype,
    gender,
    selective,
    ownership,
    searchString,
    opportunityClass,
    mapBounds,
  } = searchConfig;
  return getAllSchools().filter((school) => {
    if (
      schoolAffiliation.size > 0 &&
      !schoolAffiliation.has(school.schoolAffilation)
    ) {
      return false;
    }
    if (
      levelOfSchooling.size > 0 &&
      !levelOfSchooling.has(school.levelOfSchooling)
    ) {
      return false;
    }
    if (schoolSubtype.size > 0 && !schoolSubtype.has(school.schoolSubtype)) {
      return false;
    }
    if (gender.size > 0 && !gender.has(school.gender)) {
      return false;
    }
    if (selective.size > 0 && !selective.has(school.selectiveness)) {
      return false;
    }
    if (
      ownership.size > 0 &&
      !ownership.has(school.isGovernment ? "Government" : "Non Government")
    ) {
      return false;
    }
    if (
      searchString &&
      !school.name.toLowerCase().includes(searchString.toLowerCase())
    ) {
      return false;
    }
    if (opportunityClass && !school.opportunityClass) {
      return false;
    }
    if (
      !(
        mapBounds &&
        mapBounds.ne.lat >= Number(school.latitude) &&
        mapBounds.sw.lat <= Number(school.latitude) &&
        mapBounds.ne.lng >= Number(school.longtitude) &&
        mapBounds.sw.lng <= Number(school.longtitude)
      )
    ) {
      return false;
    }
    return true;
  });
};
