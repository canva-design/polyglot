import React from "react";
import { Button, Text } from "../figma";
import styles from "./index.css";

export const Splash = ({ onContinueClick }) => (
  <section className={styles.root}>
    <Text.H1>Polyglot</Text.H1>
    <Text.Paragraph>
      Made for designers working on global products
    </Text.Paragraph>
    <Button.Primary onClick={onContinueClick}>Continue</Button.Primary>
  </section>
);
