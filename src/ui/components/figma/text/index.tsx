import React from "react";
import classnames from "classnames";
import styles from "./index.css";

export const Paragraph = ({ children }) => (
  <p className={classnames(styles.paragraph)}>{children}</p>
);

export const H1 = ({ children }) => (
  <h1 className={classnames(styles.h1)}>{children}</h1>
);

export const H2 = ({ children }) => (
  <h2 className={classnames(styles.h2)}>{children}</h2>
);
