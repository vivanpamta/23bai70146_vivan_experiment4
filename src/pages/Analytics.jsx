import React, { useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import StatCard from "../components/StatCard.jsx";

export default function Analytics() {
  const { state, theme, user } = useApp();

  const stats = useMemo(() => {
    const total = state.tasks.length;
    const done = state.tasks.reduce((c, t) => c + (t.done ? 1 : 0), 0);
    const pending = total - done;

    const favCount = Object.keys(state.favorites).length;

    const byTag = state.tasks.reduce((acc, t) => {
      const key = (t.tag || "general").toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const topTag = Object.entries(byTag).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

    const completionRate = total ? Math.round((done / total) * 100) : 0;

    return { total, done, pending, favCount, topTag, byTag, completionRate };
  }, [state.tasks, state.favorites]);

  const hasTasks = stats.total > 0;

  return (
    <section className="card">
      <div className="row space">
        <div>
          <h2 className="title">Analytics</h2>
          <p className="muted small">
            Derived values are optimized using <b>useMemo</b>.
          </p>
        </div>

        <div className="pill" title="Context values">
          Theme: <b>{theme}</b> • User: <b>{user.name}</b>
        </div>
      </div>

      <div className="grid3">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.done} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Favorites" value={stats.favCount} />
        <StatCard label="Top Tag" value={stats.topTag} />
        <StatCard label="Completion Rate" value={`${stats.completionRate}%`} />
      </div>

      <div className="panel">
        <div className="row space">
          <h3 style={{ margin: 0 }}>Tasks by Tag</h3>
          {hasTasks && (
            <span className="muted small">
              Showing <b>{Object.keys(stats.byTag).length}</b> tags
            </span>
          )}
        </div>

        {!hasTasks ? (
          <p className="muted" style={{ marginTop: 10 }}>
            No tasks yet. Add tasks from <b>Board</b> to see analytics.
          </p>
        ) : (
          <div className="tagsWrap" style={{ marginTop: 10 }}>
            {Object.entries(stats.byTag).map(([tag, count]) => (
              <span className="tagPill" key={tag}>
                {tag} <b>•</b> {count}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
