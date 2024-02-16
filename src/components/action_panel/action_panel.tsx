import * as React from "react";
import classNames from "classnames";
import styles from "./action_panel.module.css";

export const ActionPanel = (props: { children: React.ReactNode }) => {
  const [isVisible, setVisible] = React.useState(true);
  const toggleVisible = React.useCallback(() => {
    setVisible((isVisible) => !isVisible);
  }, [setVisible]);
  return (
    <div
      className={classNames(styles.actionPanel, {
        [styles.actionPanelClosed]: !isVisible,
      })}
    >
      <div className={styles.toggleButtonContainer}>
        <button
          className={styles.toggleButton}
          onClick={toggleVisible}
        ></button>
      </div>
      {props.children}
    </div>
  );
};
