import * as React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { bootstrap } from "services/bootstrap";
import { IObservableValue } from "mobx";
import {
  SearchConfigState,
  toggleAffiliation,
} from "utils/search_config_presenter";
import { observer } from "mobx-react-lite";

const OptionCheckbox = observer(
  ({
    affilation,
    searchConfigRef,
  }: {
    affilation: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleAffiliation(searchConfigRef, affilation);
    }, [searchConfigRef, affilation]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef.get().schoolAffiliation.has(affilation)}
            onChange={onChange}
            name={affilation}
          />
        }
        label={affilation}
      />
    );
  }
);

export const AffilationFilter = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="affilation-filter-content"
          id="affilation-filter-header"
        >
          <Typography>School affilation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {bootstrap.affilationOptions.map((affilation, ind) => {
                return (
                  <OptionCheckbox
                    searchConfigRef={searchConfigRef}
                    affilation={affilation}
                    key={ind}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    );
  }
);
