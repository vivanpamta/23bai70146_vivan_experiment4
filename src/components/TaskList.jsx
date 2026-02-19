import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { ACTIONS } from "../constants/actions.js";
import { formatDate } from "../utils/format.js";

export default function TaskList({ tasks, onToast }) {
  const { state, dispatch } = useApp();

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTag, setEditTag] = useState("");

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditTag(t.tag);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditTag("");
  };

  const saveEdit = () => {
    const title = editTitle.trim();
    const tag = (editTag.trim().toLowerCase() || "general");

    if (title.length < 3) {
      onToast?.("Title must be at least 3 characters", "error");
      return;
    }

    dispatch({ type: ACTIONS.TASK_EDIT, payload: { id: editingId, title, tag } });
    onToast?.("Task updated ✨", "success");
    cancelEdit();
  };

  const handleKey = (e) => {
    if (e.key === "Escape") cancelEdit();
    if (e.key === "Enter") saveEdit();
  };

  const favoriteCount = useMemo(() => Object.keys(state.favorites).length, [state.favorites]);

  if (!tasks.length) {
    return (
      <div className="panel">
        <h3 style={{ margin: 0 }}>No tasks found</h3>
        <p className="muted small" style={{ marginTop: 8 }}>
          Try changing filters/search or add a task above.
        </p>
        <p className="muted small" style={{ marginTop: 6 }}>
          Favorites currently: <b>{favoriteCount}</b>
        </p>
      </div>
    );
  }

  return (
    <div className="listWrap">
      {tasks.map((t) => {
        const isFav = !!state.favorites[t.id];
        const isEditing = editingId === t.id;

        return (
          <div className="task" key={t.id}>
            <button
              className={t.done ? "check done" : "check"}
              onClick={() => {
                dispatch({ type: ACTIONS.TASK_TOGGLE_DONE, payload: t.id });
                onToast?.(t.done ? "Marked as pending" : "Marked as done ✅", "info");
              }}
              title="Toggle done"
              aria-label={t.done ? "Mark as pending" : "Mark as done"}
            >
              {t.done ? "✓" : "○"}
            </button>

            <div className="taskBody">
              {!isEditing ? (
                <>
                  <div className={t.done ? "taskTitle done" : "taskTitle"}>{t.title}</div>
                  <div className="taskMeta">
                    <span className="tag">{t.tag}</span>
                    <span className="muted small">{formatDate(t.createdAt)}</span>
                  </div>
                </>
              ) : (
                <div className="editBox" onKeyDown={handleKey}>
                  <input
                    className="input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title…"
                    autoFocus
                  />
                  <input
                    className="input"
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                    placeholder="Edit tag…"
                  />
                  <div className="row gap">
                    <button className="btn tiny" type="button" onClick={saveEdit}>Save</button>
                    <button className="btn tiny secondary" type="button" onClick={cancelEdit}>Cancel</button>
                  </div>
                  <p className="muted small" style={{ marginTop: 8 }}>
                    Tip: Press <b>Enter</b> to save • <b>Esc</b> to cancel
                  </p>
                </div>
              )}
            </div>

            {!isEditing && (
              <>
                <button
                  className={isFav ? "btn tiny" : "btn tiny secondary"}
                  onClick={() => {
                    dispatch({ type: ACTIONS.FAV_TOGGLE, payload: t.id });
                    onToast?.(isFav ? "Removed from favorites" : "Added to favorites ★", "success");
                  }}
                  title="Favorite"
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFav ? "★" : "☆"}
                </button>

                <button
                  className="btn tiny secondary"
                  onClick={() => startEdit(t)}
                  title="Edit"
                  aria-label="Edit task"
                >
                  Edit
                </button>

                <button
                  className="btn tiny danger"
                  onClick={() => {
                    dispatch({ type: ACTIONS.TASK_DELETE, payload: t.id });
                    onToast?.("Task deleted", "info");
                  }}
                  title="Delete"
                  aria-label="Delete task"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
