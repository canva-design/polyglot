import React, { useReducer } from "react";

const ROUTE_CHANGE = "ROUTE_CHANGE";

type ChangeRouteAction = {
  type: "ROUTE_CHANGE";
  payload: number;
};

const reducer = (state, action) => {
  switch (action.type) {
    case ROUTE_CHANGE: {
      return { ...state, activeIndex: action.payload };
    }
    default: {
      console.info(`Unhandled type: ${action.type}`);

      return state;
    }
  }
};

const initialState = {
  activeIndex: 0,
};

export const useRouter = ({ max, min = 0 }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeRoute = (index: number) =>
    index < max || index >= min
      ? dispatch({ type: ROUTE_CHANGE, payload: index })
      : undefined;

  const previous = () =>
    dispatch({ type: ROUTE_CHANGE, payload: state.activeIndex - 1 });
  const next = () =>
    dispatch({ type: ROUTE_CHANGE, payload: state.activeIndex + 1 });

  return {
    activeRoute: state.activeIndex,
    changeRoute,
    previous: state.activeIndex > min ? previous : undefined,
    next: state.activeIndex + 1 < max ? next : undefined,
  };
};
