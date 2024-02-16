import React from "react";
import { Paper, InputBase } from "@mui/material";
import { IObservableValue } from "mobx";
import {
  updateSearchString,
  SearchConfigState,
} from "utils/search_config_presenter";
import styles from "./search_input.module.css";

export const SearchInput = ({
  searchConfigRef,
}: {
  searchConfigRef: IObservableValue<SearchConfigState>;
}) => {
  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchString(searchConfigRef, e.target.value);
    },
    [searchConfigRef]
  );

  return (
    <Paper component="div" className={styles.root}>
      <InputBase
        className={styles.input}
        placeholder="Search by suburb or school name"
        inputProps={{ "aria-label": "Search by suburb or school name" }}
        defaultValue={searchConfigRef.get().searchString}
        onChange={onInputChange}
      />
    </Paper>
  );
};
