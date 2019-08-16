import React, { useState } from "react";
import classnames from "classnames";
import styles from "./index.css";

export const Select = ({
  placeholder = "Choose a language",
  onChange,
  options,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        <span>{label || placeholder}</span>
        <i className={styles.chevronDown}></i>
      </button>
      <ul className={classnames(styles.list, { [styles.listActive]: open })}>
        {options.map(option => (
          <li
            className={styles.listItem}
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
              setLabel(option.label);
              setValue(option.value);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
