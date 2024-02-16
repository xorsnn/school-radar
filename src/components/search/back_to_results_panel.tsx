import * as React from "react";
import { IconButton, Toolbar, AppBar, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./back_to_results_panel.module.css";
import { resetConfig } from "utils/search_config_presenter";
import { IObservableValue } from "mobx";
import { SearchConfigState } from "utils/search_config_presenter";

export const BackToResultsPanel = ({
  onBackClicked,
  searchConfigRef,
}: {
  onBackClicked: () => void;
  searchConfigRef: IObservableValue<SearchConfigState>;
}) => {
  const resetConfigCb = React.useCallback(() => {
    resetConfig(searchConfigRef);
  }, [searchConfigRef]);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Back to results"
          onClick={onBackClicked}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box className={styles.divider}></Box>
        <Button color="inherit" onClick={resetConfigCb}>
          Clear
        </Button>
        <Button color="inherit" onClick={onBackClicked}>
          Done
        </Button>
      </Toolbar>
    </AppBar>
  );
};
