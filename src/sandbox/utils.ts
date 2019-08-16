export const getSelection = () => figma.currentPage.selection.length !== 0;

export const extractTextFromNode = (node, textNodes = new Map()) => {
  // Only extract items which are visible and not locked
  // maybe we should drop the lock check – could be a pain in the ass to unlock
  // everything just for this
  const shouldTraverse = node.visible && !node.locked;

  if (shouldTraverse) {
    console.info(`${node.name} is either locked or not current visible.`);

    return textNodes;
  }

  if (node.type === "TEXT") {
    textNodes.set(node.id, node.characters);
  }

  if (node.children) {
    node.children.forEach(child => {
      extractTextFromNode(child, textNodes);
    });
  }

  // Exhausted all possible traversal paths
  return textNodes;
};

export const getSelectedFrame = () => {
  const [currentSelection] = figma.currentPage.selection;

  if (!currentSelection) {
    alert("Please select a frame.");

    // No active selection.
    return undefined;
  }

  if (currentSelection.type !== "FRAME") {
    alert(
      `The current node is a ${currentSelection.type.toLowerCase()}. Please only select a frame.`,
    );

    return undefined;
  }

  return currentSelection;
};
