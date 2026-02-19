import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import Toast from "../components/Toast.jsx";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useToast } from "../hooks/useToast.js";
import { ACTIONS } from "../constants/actions.js";

const SORT = Object.freeze({
  NEWEST: "NEWEST",
  OLDEST: "OLDEST",
  DONE_FIRST: "DONE_FIRST",
});

const FILTER = Object.freeze({
  ALL: "ALL",
  DONE: "DONE",
  PENDING: "PENDING",
  FAVORITES: "FAVORITES",
});

export default function Board() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(SORT.NEWEST);
  const [filterBy, setFilterBy] = useState(FILTER.ALL);

  const debouncedQuery = useDebouncedValue(query, 200);
  const { toast, show, clear } = useToast();

  const viewTasks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    let list = state.tasks.filter((t) => {
      const matchesSearch =
        !q || t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q);

      const isFav = !!state.favorites[t.id];

      const matchesFilter =
        filterBy === FILTER.ALL ||
        (filterBy === FILTER.DONE && t.done) ||
        (filterBy === FILTER.PENDING && !t.done) ||
        (filterBy === FILTER.FAVORITES && isFav);

      return matchesSearch && matchesFilter;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === SORT.NEWEST) return b.createdAt - a.createdAt;
      if (sortBy === SORT.OLDEST) return a.createdAt - b.createdAt;
      if (sortBy === SORT.DONE_FIRST) return Number(b.done) - Number(a.done);
      return 0;
    });

    return list;
  }, [state.tasks, state.favorites, debouncedQuery, sortBy, filterBy]);

  const summary = useMemo(() => {
    const total = state.tasks.length;
    const done = state.tasks.reduce((c, t) => c + (t.done ? 1 : 0), 0);
    const fav = Object.keys(state.favorites).length;
    return { total, done, fav };
  }, [state.tasks, state.favorites]);

  const clearFavorites = () => {
    dispatch({ type: ACTIONS.FAV_CLEAR });
    show("Favorites cleared", "info");
  };

  return (
    <section className="card">
      <Toast toast={toast} onClose={clear} />

      <div className="row space">
        <div>
          <h2 className="title">Board</h2>
          <p className="muted small">
            Manage tasks with <b>useReducer</b>, global state via <b>useContext</b>, and fast UI via <b>useMemo</b>.
          </p>
        </div>

        <button className="btn secondary" onClick={clearFavorites}>
          Clear Favorites
        </button>
      </div>

      <div className="panel">
        <div className="row space">
          <div className="pill">
            Total: <b>{summary.total}</b> • Done: <b>{summary.done}</b> • Favorites: <b>{summary.fav}</b>
          </div>

          <div className="row gap">
            <select className="select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value={FILTER.ALL}>Filter: All</option>
              <option value={FILTER.DONE}>Filter: Done</option>
              <option value={FILTER.PENDING}>Filter: Pending</option>
              <option value={FILTER.FAVORITES}>Filter: Favorites</option>
            </select>

            <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value={SORT.NEWEST}>Sort: Newest</option>
              <option value={SORT.OLDEST}>Sort: Oldest</option>
              <option value={SORT.DONE_FIRST}>Sort: Done first</option>
            </select>
          </div>
        </div>

        <div className="row gap" style={{ marginTop: 12 }}>
          <input
            className="input"
            placeholder="Search by title or tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
          />
          <button className="btn danger" onClick={() => { setQuery(""); show("Search cleared", "info"); }}>
            Clear
          </button>
        </div>
      </div>

      <TaskForm onToast={show} />
      <TaskList tasks={viewTasks} onToast={show} />
    </section>
  );
}
