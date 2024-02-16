import { toggleSetValue } from "utils/set";
import { IObservableValue, runInAction } from "mobx";

type MapBounds = {
  ne: {
    lat: number;
    lng: number;
  };
  sw: {
    lat: number;
    lng: number;
  };
};

export type SearchConfigState = {
  schoolAffiliation: Set<string>;
  levelOfSchooling: Set<string>;
  schoolSubtype: Set<string>;
  gender: Set<string>;
  selective: Set<string>;
  ownership: Set<string>;
  searchString: string;
  opportunityClass: boolean;
  mapBounds?: MapBounds;
};

export const initCfg: SearchConfigState = {
  schoolAffiliation: new Set(),
  levelOfSchooling: new Set(),
  schoolSubtype: new Set(),
  gender: new Set(),
  selective: new Set(),
  ownership: new Set(),
  opportunityClass: false,
  searchString: "",
};

export const resetConfig = (stateRef: IObservableValue<SearchConfigState>) => {
  runInAction(() => {
    stateRef.set(initCfg);
  });
};

export const setMapBounds = (
  stateRef: IObservableValue<SearchConfigState>,
  mapBounds: MapBounds
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      mapBounds,
    });
  });
};

export const toggleOpportunityClass = (
  stateRef: IObservableValue<SearchConfigState>
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      opportunityClass: !state.opportunityClass,
    });
  });
};

export const toggleOwnership = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      ownership: new Set(toggleSetValue(state.ownership, value)),
    });
  });
};

export const toggleSelective = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      selective: new Set(toggleSetValue(state.selective, value)),
    });
  });
};

export const toggleGender = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      gender: new Set(toggleSetValue(state.gender, value)),
    });
  });
};

export const toggleLevelOfSchooling = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      levelOfSchooling: new Set(toggleSetValue(state.levelOfSchooling, value)),
    });
  });
};

export const toggleSchoolSubtype = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      schoolSubtype: new Set(toggleSetValue(state.schoolSubtype, value)),
    });
  });
};

export const toggleAffiliation = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      schoolAffiliation: new Set(
        toggleSetValue(state.schoolAffiliation, value)
      ),
    });
  });
};

export const updateSearchString = (
  stateRef: IObservableValue<SearchConfigState>,
  value: string
) => {
  const state = stateRef.get();
  runInAction(() => {
    stateRef.set({
      ...state,
      searchString: value,
    });
  });
};
