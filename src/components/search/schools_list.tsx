import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  TablePagination,
} from "@mui/material";
import { ActionPanelBlock } from "components/ui/action_panel_block";
import { School } from "services/school";
import { IObservableValue } from "mobx";
import { observer } from "mobx-react-lite";

const ROWS_PER_PAGE = 20;

const SchoolListItem = ({ school }: { school: School }) => {
  return (
    <>
      <ListItem button>
        <ListItemText primary={school.name} />
      </ListItem>
      <Divider />
    </>
  );
};

const SchoolsList = observer(
  ({ schoolsList }: { schoolsList: IObservableValue<School[]> }) => {
    const [page, setPage] = React.useState(0);
    const handleChangePage = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
      },
      [setPage]
    );
    return (
      <>
        <ActionPanelBlock grow={true}>
          <List component="nav" aria-label="schools">
            {schoolsList &&
              schoolsList
                .get()
                .slice(
                  ROWS_PER_PAGE * page,
                  ROWS_PER_PAGE * page + ROWS_PER_PAGE
                )
                .map((school) => {
                  return (
                    <SchoolListItem school={school} key={school.internalId} />
                  );
                })}
          </List>
        </ActionPanelBlock>
        <ActionPanelBlock grow={false}>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={schoolsList.get().length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={ROWS_PER_PAGE}
          />
        </ActionPanelBlock>
      </>
    );
  }
);

SchoolsList.displayName = "SchoolsList";

export { SchoolsList };
