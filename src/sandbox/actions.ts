import { extractTextFromNode, getSelectedFrame } from "./utils";

const getFontInfo = language => {
  switch (language) {
    case "AR":
      // Arabic
      return {
        style: { family: ".Arabic UI Text", style: "Regular" },
        right: true,
      };
    case "ZH-CN":
      // Chinese (simplified)
      return {
        style: { family: "Noto Sans SC", style: "Regular" },
        right: false,
      };
    case "ZH-TW":
      // Chinese (traditional)
      return {
        style: { family: "Noto Sans TC", style: "Regular" },
        right: false,
      };
    case "JA":
      // Japanese
      return {
        style: { family: "Noto Sans JP", style: "Regular" },
        right: false,
      };
    case "KO":
      // Korean
      return {
        style: { family: "Noto Sans KR", style: "Regular" },
        right: false,
      };
    default:
      return null;
  }
};

export const cancel = () => {
  figma.closePlugin();
};

export const find = async () => {
  const frame = getSelectedFrame();

  if (!frame) {
    console.info("No frame found.");

    // No frame, exit early.
    return undefined;
  }

  // Search for strings
  const textNodes = frame.findAll(child => child.type === "TEXT");

  const textMap = textNodes.reduce((acc, item) => {
    const english = item.getPluginData("english");

    if (!english) {
      // @ts-ignore
      item.setPluginData("english", item.characters);
    }

    // @ts-ignore
    acc.set(item.id, english ? english : item.characters);

    return acc;
  }, new Map());

  await figma.clientStorage.setAsync("textNodes", JSON.stringify(textNodes));

  // Send bundle of strings back to UI layer for translation
  figma.ui.postMessage({ data: [...textMap] });
};

export const replace = data => {
  const frame = getSelectedFrame();

  data.translations.forEach(async translation => {
    const node = frame.findOne(child => child.id === translation.key);
    const { style, right } = getFontInfo(data.language) || {
      // @ts-ignore
      style: node.fontName,
      // @ts-ignore
      right: node.textAlignHorizontal === "RIGHT",
    };

    // @ts-ignore
    await figma.loadFontAsync(style as FontName);

    // @ts-ignore
    node.fontName = style;

    if (right) {
      // @ts-ignore
      node.textAlignHorizontal = "RIGHT";
    }

    // @ts-ignore
    node.characters = translation.value;
  });
};

export const skipOnboarding = async () => {
  await figma.clientStorage.setAsync("SKIP_ONBOARDING", 1);
};

export const getOnboardingStatus = async () => {
  const status = await figma.clientStorage.getAsync("SKIP_ONBOARDING");

  figma.ui.postMessage({ data: status || "0" });
};

export const resize = data => {
  figma.ui.resize(data.width, data.height);
};
