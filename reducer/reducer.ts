import { Action, State } from "../types/reducer";

export const initialState: State = {
  darkMode: false,};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "themeMode":
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }

}