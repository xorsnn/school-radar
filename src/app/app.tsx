"use client";

import React from "react";
import { SchoolMap } from "components/school_map/school_map";
import { ActionPanel } from "components/action_panel/action_panel";
import { Search } from "components/search/search";
import { SearchConfigState, initCfg } from "utils/search_config_presenter";
import { searchSchools } from "services/api";
import { School } from "services/school";
import { observable, IObservableValue, autorun, runInAction } from "mobx";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";

type Props = object;
type State = {
  searchConfigRef: IObservableValue<SearchConfigState>;
  schoolsList: IObservableValue<School[]>;
};

export class App extends React.Component<Props, State> {
  searchConfigRef: IObservableValue<SearchConfigState> =
    observable.box(initCfg);

  schoolsList: IObservableValue<School[]> = observable.box([]);

  constructor(props: Props) {
    super(props);

    autorun(() => {
      const searchConfig = this.searchConfigRef.get();
      runInAction(() => {
        this.schoolsList.set(searchSchools(searchConfig));
      });
    });
  }

  render() {
    return (
      <>
        <ActionPanel>
          <Search
            schoolsList={this.schoolsList}
            searchConfigRef={this.searchConfigRef}
          />
        </ActionPanel>
        <SchoolMap
          schoolsList={this.schoolsList}
          searchConfigRef={this.searchConfigRef}
        />
        <Link href="https://github.com/xorsnn/school-radar" passHref>
          <IconButton
            sx={{
              position: "fixed",
              top: 16, // adjust as needed
              right: 16, // adjust as needed
            }}
          >
            <GitHubIcon />
            <Typography variant="body1">
              This is an open-source project. Contribute on GitHub!
            </Typography>
          </IconButton>
        </Link>
      </>
    );
  }
}
