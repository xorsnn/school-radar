import * as React from "react";
import { Box } from "@mui/material";
import styles from "./action_panel_block.module.css";
import classNames from "classnames";

export const ActionPanelBlock = (props: {
  grow: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Box
      component="div"
      className={classNames(styles.root, { [styles.grow]: props.grow })}
    >
      {props.children}
    </Box>
  );
};
