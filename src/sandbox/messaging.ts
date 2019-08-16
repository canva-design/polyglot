import * as actions from "./actions";
import { PluginMessage } from "shared/plugin-message";

export const handleMessage = message => {
  switch (message.type) {
    case PluginMessage.Cancel:
      actions.cancel();
      break;
    case PluginMessage.Find:
      actions.find();
      break;
    case PluginMessage.Replace:
      actions.replace(message.data);
      break;
    case PluginMessage.SkipOnboarding:
      actions.skipOnboarding();
      break;
    case PluginMessage.GetOnboardingStatus:
      actions.getOnboardingStatus();
      break;
    case PluginMessage.Resize:
      actions.resize(message.data);
      break;
    default:
      console.info(`${message.type} not understood.`);
  }
};
