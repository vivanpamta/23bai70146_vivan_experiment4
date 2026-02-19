import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { v4 as uuid } from "uuid";
import { ACTIONS } from "../constants/actions.js";

export default function TaskForm({ onToast }) {
  const { dispatch } = useApp();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("general");

  const titleTrim = useMemo(() => title.trim(), [title]);
  const tagTrim = useMemo(() => tag.trim().toLowerCase() || "general", [tag]);

  const addTask = (e) => {
    e.preventDefault();
    if (titleTrim.length < 3) {
      onToast?.("Title must be at least 3 characters", "error");
      return;
    }

    dispatch({
      type: ACTIONS.TASK_ADD,
      payload: {
        id: uuid(),
        title: titleTrim,
        tag: tagTrim,
        done: false,
        createdAt: Date.now(),
      },
    });

    onToast?.("Task added ✅", "success");
    setTitle("");
    setTag("general");
  };

  return (
    <form onSubmit={addTask} className="panel">
      <div className="row gap">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task (min 3 chars)…"
          aria-label="Task title"
        />
        <input
          className="input"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="tag (react, dsa, exam)"
          aria-label="Task tag"
        />
        <button className="btn" type="submit" disabled={titleTrim.length < 3}>
          Add
        </button>
      </div>
      {titleTrim.length > 0 && titleTrim.length < 3 && (
        <p className="muted small" style={{ marginTop: 10 }}>
          Tip: Keep titles short and clear (example: “Finish Analytics page”).
        </p>
      )}
    </form>
  );
}
