import * as React from "react";
import { SearchInput } from "./search_input";
import { SearchFilters } from "./filters/search_filters";
import { Box, Button } from "@mui/material";
import { ActionPanelBlock } from "components/ui/action_panel_block";
import { SchoolsList } from "./schools_list";
import TuneIcon from "@mui/icons-material/Tune";
import { BackToResultsPanel } from "./back_to_results_panel";
import { School } from "services/school";
import { IObservableValue } from "mobx";
import { SearchConfigState } from "utils/search_config_presenter";
import { observer } from "mobx-react-lite";
import styles from "./search.module.css";

type ActiveView = "FILTERS" | "RESULTS";

export const Search = observer(
  ({
    schoolsList,
    searchConfigRef,
  }: {
    schoolsList: IObservableValue<School[]>;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const [activeView, setActiveView] = React.useState<ActiveView>("RESULTS");

    const showMoreFilters = React.useCallback(() => {
      setActiveView("FILTERS");
    }, [setActiveView]);

    const backToResultsClicked = React.useCallback(() => {
      setActiveView("RESULTS");
    }, [setActiveView]);

    return (
      <Box component="form" className={styles.search}>
        <ActionPanelBlock grow={false}>
          <SearchInput searchConfigRef={searchConfigRef} />
        </ActionPanelBlock>
        {activeView === "RESULTS" && (
          <>
            <ActionPanelBlock grow={false}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<TuneIcon />}
                onClick={showMoreFilters}
              >
                More filters
              </Button>
            </ActionPanelBlock>
            <ActionPanelBlock grow={true}>
              <SchoolsList schoolsList={schoolsList} />
            </ActionPanelBlock>
          </>
        )}
        {activeView === "FILTERS" && (
          <>
            <BackToResultsPanel
              onBackClicked={backToResultsClicked}
              searchConfigRef={searchConfigRef}
            />
            <ActionPanelBlock grow={true}>
              <SearchFilters searchConfigRef={searchConfigRef} />
            </ActionPanelBlock>
          </>
        )}
      </Box>
    );
  }
);
