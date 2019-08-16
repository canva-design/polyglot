import React from "react";
import classnames from "classnames";
import styles from "./index.css";

const enum ButtonVariant {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
}

const Button = ({
  children,
  destructive = false,
  onClick,
  variant = ButtonVariant.Primary,
}) => (
  <button
    className={classnames(styles.root, {
      [styles.primary]: variant === ButtonVariant.Primary,
      [styles.secondary]: variant === ButtonVariant.Secondary,
    })}
    onClick={onClick}
  >
    {children}
  </button>
);

export const Primary = props => (
  <Button variant={ButtonVariant.Primary} {...props} />
);

export const Secondary = props => (
  <Button variant={ButtonVariant.Secondary} {...props} />
);
