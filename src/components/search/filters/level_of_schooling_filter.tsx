import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IObservableValue } from "mobx";
import {
  SearchConfigState,
  toggleLevelOfSchooling,
} from "utils/search_config_presenter";
import { bootstrap } from "services/bootstrap";
import { observer } from "mobx-react-lite";

const LevelOfSchoolingCheckbox = observer(
  ({
    searchConfigRef,
    levelOfSchooling,
  }: {
    levelOfSchooling: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleLevelOfSchooling(searchConfigRef, levelOfSchooling);
    }, [searchConfigRef, levelOfSchooling]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef
              .get()
              .levelOfSchooling.has(levelOfSchooling)}
            onChange={onChange}
            name={levelOfSchooling}
          />
        }
        label={levelOfSchooling}
      />
    );
  }
);

export const LevelOfSchoolingFilter = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="level-of-schooling-filter-content"
          id="level-of-schooling-filter-header"
        >
          <Typography>Level of schooling</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {bootstrap.levelOfSchoolingOptions.map(
                (levelOfSchooling, ind) => {
                  return (
                    <LevelOfSchoolingCheckbox
                      levelOfSchooling={levelOfSchooling}
                      searchConfigRef={searchConfigRef}
                      key={ind}
                    />
                  );
                }
              )}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    );
  }
);
