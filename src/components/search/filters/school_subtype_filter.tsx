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
import { bootstrap } from "services/bootstrap";
import { IObservableValue } from "mobx";
import {
  SearchConfigState,
  toggleSchoolSubtype,
} from "utils/search_config_presenter";
import { observer } from "mobx-react-lite";

const SchoolSubtypeCheckbox = observer(
  ({
    schoolSubtype,
    searchConfigRef,
  }: {
    schoolSubtype: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleSchoolSubtype(searchConfigRef, schoolSubtype);
    }, [searchConfigRef, schoolSubtype]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef.get().schoolSubtype.has(schoolSubtype)}
            onChange={onChange}
            name={schoolSubtype}
          />
        }
        label={schoolSubtype}
      />
    );
  }
);

export const SchoolSubtypeFilter = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="school-subtype-filter-content"
          id="school-subtype-filter-header"
        >
          <Typography>School subtype</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {bootstrap.schoolSubtypeOptions.map((schoolSubtype, ind) => {
                return (
                  <SchoolSubtypeCheckbox
                    searchConfigRef={searchConfigRef}
                    schoolSubtype={schoolSubtype}
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
