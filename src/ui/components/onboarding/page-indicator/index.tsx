import React from "react";
import classnames from "classnames";
import styles from "./index.css";

export const PageIndicator = ({ activeIndex, pageLength }) => (
  <div className={styles.root}>
    {[...Array(pageLength).keys()].map(index => (
      <div
        className={classnames(styles.dot, {
          [styles.active]: activeIndex === index,
        })}
        key={index}
      />
    ))}
  </div>
);
