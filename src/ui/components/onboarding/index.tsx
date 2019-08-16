import React from "react";
import classnames from "classnames";
import { Button, Icon, Text } from "figma";
import { useRouter } from "hooks/use-router";
import { PageIndicator } from "./page-indicator";
import { OnboardingContainer } from "./onboarding-container";
import { OnboardingFooter } from "./onboarding-footer";
import { steps } from "./steps";
import styles from "./index.css";

export const Onboarding = ({ onEnd }) => {
  const { activeRoute, previous, next } = useRouter({ max: steps.length });

  return (
    <OnboardingContainer>
      <div className={styles.carousel}>
        {steps.map((step, index) => (
          <div
            className={classnames(styles.carouselFrame, {
              [styles.active]: index === activeRoute,
            })}
            key={step.message}
          >
            <video
              className={styles.video}
              src={step.url}
              autoPlay
              loop
              muted
            />
            <Text.H2>{step.message}</Text.H2>
          </div>
        ))}
      </div>
      <OnboardingFooter>
        {previous && (
          <Button.Secondary onClick={previous}>
            <Icon.RightChevron />
            back
          </Button.Secondary>
        )}
        <PageIndicator activeIndex={activeRoute} pageLength={steps.length} />
        <Button.Primary onClick={next || onEnd}>
          {next ? "Next" : "Okay, got it"}
        </Button.Primary>
      </OnboardingFooter>
    </OnboardingContainer>
  );
};
