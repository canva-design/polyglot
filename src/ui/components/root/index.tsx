import React, { useCallback, useEffect, useState } from "react";
import { PluginMessage } from "shared/plugin-message";
import { getOnboardingStatus, skipOnboarding, resizeUI } from "../../messaging";
import { useRouter } from "hooks/use-router";
import { Help } from "../help";
import { Splash } from "../splash";
import { Onboarding } from "../onboarding";
import { Main } from "../main";

const enum Routes {
  Splash,
  Onboarding,
  Main,
  Help,
}

export const Root = () => {
  const [loading, setLoading] = useState(true);
  const { activeRoute, changeRoute } = useRouter({ max: Routes.Help });

  const getStatus = async () => {
    const onboardingViewed = await getOnboardingStatus();

    if (onboardingViewed) {
      changeRoute(Routes.Main);
      resizeUI(400, 250);
    } else {
      changeRoute(Routes.Splash);
    }

    setLoading(false);
  };

  useEffect(() => {
    getStatus();
  }, []);

  const showOnboarding = useCallback(() => {
    resizeUI(670, 480);
    changeRoute(Routes.Onboarding);
  }, [changeRoute]);
  const showMain = useCallback(() => {
    skipOnboarding();
    resizeUI(400, 250);
    changeRoute(Routes.Main);
  }, [changeRoute]);
  const showHelp = useCallback(() => {
    changeRoute(Routes.Help);
  }, [changeRoute]);

  switch (activeRoute) {
    case Routes.Splash:
      return <Splash onContinueClick={showOnboarding} />;
    case Routes.Onboarding:
      return <Onboarding onEnd={showMain} />;
    case Routes.Main:
      return <Main onHelpClick={showHelp} />;
    case Routes.Help:
      return <Help />;
    default:
      return null;
  }
};
