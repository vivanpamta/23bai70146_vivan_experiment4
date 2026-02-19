import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { taskReducer, initialTaskState } from "../reducer/taskReducer.js";
import { seedTasks } from "../utils/sampleData.js";
import { loadState, saveState } from "../utils/storage.js";
import { ACTIONS } from "../constants/actions.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const persisted = loadState();

  // Theme persisted
  const [theme, setTheme] = useState(persisted?.theme ?? "dark");

  const [user] = useState({
    name: "Via Student",
    role: "Taskboard User",
    tagline: "Plan small. Win daily.",
  });

  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // Hydrate reducer state once
  useEffect(() => {
    const initial = persisted?.data ?? { ...initialTaskState, tasks: seedTasks() };
    dispatch({ type: ACTIONS.HYDRATE, payload: initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Persist on change
  useEffect(() => {
    saveState({ theme, data: state });
  }, [theme, state]);

  const value = useMemo(
    () => ({ theme, toggleTheme, user, state, dispatch }),
    [theme, user, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
