import type { AppProps } from "next/app";
import React, { useState, useEffect, useReducer, createContext } from "react";
import GlobalContextProvider from "../components/GlobalContext";
import KYA from "../components/home/KYA";
import Init from "../components/Init";
import Modal from "../components/Modal";
import Leftbar from "../components/partials/Leftbar";
import Navbar from "../components/partials/Navbar";
import "../styles/globals.scss";
import useWindowSize from "../hooks/useResponsive";
import { Action, State } from "../types/reducer";
import { reducer, initialState } from "../reducer/reducer";

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const { width } = useWindowSize();
  const isLarge = width > 1000;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const body = document.body;
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode !== null) {
      const theme = JSON.parse(themeMode);
      if (theme.dark) {
        dispatch({ type: "themeMode", payload: true });
        body.classList.add("dark");
      } else {
        dispatch({ type: "themeMode", payload: false });
        body.classList.remove("dark");
      }
    } else{
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      dispatch({ type: "themeMode", payload: mediaQuery.matches });
      const theme = { theme: "system", dark: mediaQuery.matches };
      localStorage.setItem("themeMode", JSON.stringify(theme));
    }
  }, [state.darkMode]);

  return (
    <div>
      <GlobalContextProvider>
        <AppContext.Provider value={{ state, dispatch }}>
        <Init>
          <Modal></Modal>
          <Navbar />
          <KYA />
          <Component {...pageProps} />
          {isLarge && <Leftbar />}
        </Init>
        </AppContext.Provider>
      </GlobalContextProvider>
    </div>
  );
}
