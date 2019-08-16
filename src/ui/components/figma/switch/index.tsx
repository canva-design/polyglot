import React from "react";
import styles from "./index.css";

export const Switch = ({ label }) => (
  <label className={styles.root}>
    <div className={styles.container}>
      <input type="checkbox" className={styles.checkbox} />
      <span className={styles.slider}></span>
    </div>
    <div className={styles.label}>{label}</div>
  </label>
);
