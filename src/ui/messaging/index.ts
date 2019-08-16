import { PluginMessage } from "shared/plugin-message";

export const getOnboardingStatus = () =>
  new Promise(resolve => {
    parent.postMessage(
      { pluginMessage: { type: PluginMessage.GetOnboardingStatus } },
      "*",
    );

    self.onmessage = event => {
      resolve(Boolean(Number.parseInt(event.data.pluginMessage.data, 10)));
    };
  });

export const skipOnboarding = () => {
  parent.postMessage(
    { pluginMessage: { type: PluginMessage.SkipOnboarding } },
    "*",
  );
};

export const resizeUI = (width, height) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: PluginMessage.Resize,
        data: { width, height },
      },
    },
    "*",
  );
};

export const findAndReplace = language => {
  parent.postMessage({ pluginMessage: { type: PluginMessage.Find } }, "*");

  self.onmessage = async event => {
    const result = event.data.pluginMessage.data;

    const url = event.data.pluginMessage.data.reduce(
      (acc, [_, value]) => `${acc}&q=${value}`,
      `https://proxy.jsscclr.now.sh/api?target=${language}&format=text&source=EN`,
    );

    try {
      const response = await fetch(url);
      const { data } = await response.json();
      const translations = event.data.pluginMessage.data.reduce(
        (acc, [item], index) => {
          acc.push({
            key: item,
            value: data.translations[index].translatedText,
          });
          return acc;
        },
        [],
      );

      replace({ translations, language });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const replace = ({ translations, language }) => {
  parent.postMessage(
    {
      pluginMessage: {
        data: { translations, language },
        type: PluginMessage.Replace,
      },
    },
    "*",
  );
};
