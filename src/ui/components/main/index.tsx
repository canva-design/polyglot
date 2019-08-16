import React, { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./index.css";
import { Button, Select, Text } from "figma";
import { PluginMessage } from "shared/plugin-message";
import { findAndReplace } from "../../messaging";

const HelpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12zm18.5 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0zM8.746 9.85h1.606c.055-.834.623-1.368 1.504-1.368.862 0 1.436.513 1.436 1.224 0 .677-.287 1.04-1.135 1.552-.943.554-1.34 1.169-1.278 2.194l.007.465h1.586v-.39c0-.676.253-1.025 1.148-1.551.93-.554 1.45-1.286 1.45-2.331 0-1.511-1.252-2.591-3.125-2.591-2.03 0-3.144 1.175-3.199 2.796zm4.143 6.24c0 .657-.438 1.088-1.135 1.088-.684 0-1.135-.43-1.135-1.087 0-.663.451-1.094 1.135-1.094.697 0 1.135.43 1.135 1.094z"
      fill="currentColor"
    />
  </svg>
);

export const Main = ({ onHelpClick }) => {
  const [targetLanguage, setTargetLanguage] = useState("RU");

  const handleReplace = useCallback(() => {
    findAndReplace(targetLanguage);
  }, [targetLanguage]);

  return (
    <div className={styles.root}>
      <section>
        <Select
          options={[
            { label: "Arabic", value: "AR" },
            { label: "Chinese (Simplified)", value: "ZH-CN" },
            { label: "Chinese (Traditional)", value: "ZH-TW" },
            { label: "German", value: "DE" },
            { label: "Indonesian", value: "ID" },
            { label: "Japanese", value: "JA" },
            { label: "Korean", value: "KO" },
            { label: "Russian", value: "RU" },
          ]}
          onChange={setTargetLanguage}
        />
        <Button.Primary onClick={handleReplace}>Translate</Button.Primary>
      </section>
      <footer className={styles.footer}>
        <Text.Paragraph>
          Translate uses the Google Translate API.{" "}
          <a href="https://cloud.google.com/translate/" target="_blank">
            Learn more
          </a>
        </Text.Paragraph>
      </footer>
    </div>
  );
};
