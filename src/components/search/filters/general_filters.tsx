import * as React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IObservableValue } from "mobx";
import {
  SearchConfigState,
  toggleOpportunityClass,
  toggleSelective,
  toggleGender,
  toggleOwnership,
} from "utils/search_config_presenter";
import { bootstrap } from "services/bootstrap";
import { observer } from "mobx-react-lite";
import styles from "./general_filters.module.css";

const GenderCheckbox = observer(
  ({
    gender,
    searchConfigRef,
  }: {
    gender: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleGender(searchConfigRef, gender);
    }, [searchConfigRef, gender]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef.get().gender.has(gender)}
            onChange={onChange}
            name={gender}
          />
        }
        label={gender}
      />
    );
  }
);

const SelectiveCheckbox = observer(
  ({
    selective,
    searchConfigRef,
  }: {
    selective: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleSelective(searchConfigRef, selective);
    }, [searchConfigRef, selective]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef.get().selective.has(selective)}
            onChange={onChange}
            name={selective}
          />
        }
        label={selective}
      />
    );
  }
);

const OwnershipCheckbox = observer(
  ({
    ownership,
    searchConfigRef,
  }: {
    ownership: string;
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleOwnership(searchConfigRef, ownership);
    }, [searchConfigRef, ownership]);

    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={searchConfigRef.get().ownership.has(ownership)}
            onChange={onChange}
            name={ownership}
          />
        }
        label={ownership}
      />
    );
  }
);

const OpportunityClass = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const onChange = React.useCallback(() => {
      toggleOpportunityClass(searchConfigRef);
    }, [searchConfigRef]);

    return (
      <Switch
        checked={searchConfigRef.get().opportunityClass}
        onChange={onChange}
        color="primary"
        name="Opportunity class"
        inputProps={{ "aria-label": "Opportunity class" }}
      />
    );
  }
);

export const GeneralFilters = observer(
  ({
    searchConfigRef,
  }: {
    searchConfigRef: IObservableValue<SearchConfigState>;
  }) => {
    const [expanded, setExpanded] = React.useState<boolean>(true);

    const toggleExpanded = React.useCallback(() => {
      setExpanded((val) => !val);
    }, [setExpanded]);

    return (
      <Accordion expanded={expanded} onChange={toggleExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="general-filter-content"
          id="general-filter-header"
        >
          <Typography>General</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.form}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Opportunity class</FormLabel>
            <FormGroup>
              <OpportunityClass searchConfigRef={searchConfigRef} />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Ownership</FormLabel>
            <FormGroup>
              {bootstrap.ownershipOptions.map((ownership, ind) => {
                return (
                  <OwnershipCheckbox
                    searchConfigRef={searchConfigRef}
                    ownership={ownership}
                    key={ind}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <FormGroup>
              {bootstrap.genderOptions.map((gender, ind) => {
                return (
                  <GenderCheckbox
                    searchConfigRef={searchConfigRef}
                    gender={gender}
                    key={ind}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Selective</FormLabel>
            <FormGroup>
              {bootstrap.selectiveOptions.map((selective, ind) => {
                return (
                  <SelectiveCheckbox
                    searchConfigRef={searchConfigRef}
                    selective={selective}
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
