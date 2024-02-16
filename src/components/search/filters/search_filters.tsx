import * as React from "react";
import { AffilationFilter } from "./affilation_filter";
import { LevelOfSchoolingFilter } from "./level_of_schooling_filter";
import { SchoolSubtypeFilter } from "./school_subtype_filter";
import { GeneralFilters } from "./general_filters";
import { IObservableValue } from "mobx";
import { SearchConfigState } from "utils/search_config_presenter";
import { observer } from "mobx-react-lite";

export const SearchFilters = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    return (
      <>
        <GeneralFilters searchConfigRef={searchConfigRef} />
        <LevelOfSchoolingFilter searchConfigRef={searchConfigRef} />
        <SchoolSubtypeFilter searchConfigRef={searchConfigRef} />
        <AffilationFilter searchConfigRef={searchConfigRef} />
      </>
    );
  }
);
