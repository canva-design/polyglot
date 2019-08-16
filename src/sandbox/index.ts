import { handleMessage } from "./messaging";

// Required by Figma to show the UI
figma.showUI(__html__, { width: 400, height: 250 });

figma.ui.onmessage = handleMessage;
