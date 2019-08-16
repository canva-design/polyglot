import React from "react";
import ReactDOM from "react-dom";

const ROOT_ELEMENT_ID = "root";

export const render = Root => {
  ReactDOM.render(<Root />, document.getElementById(ROOT_ELEMENT_ID));
};
