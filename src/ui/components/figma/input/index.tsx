import React from "react";
import styles from "./index.css";

export const Input = ({ icon: Icon, ...props }) => (
  <div className={styles.root}>
    <span className={styles.icon}>
      <Icon />
    </span>
    <input type="text" className={styles.input} {...props} />
  </div>
);
