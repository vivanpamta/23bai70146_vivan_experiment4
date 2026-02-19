# Experiment 4 – Smart Taskboard (React)

## Features Implemented (As per Experiment 4 Guide)
- ✅ React Router: Home / Board / Analytics pages
- ✅ useContext: Global theme + user profile (Context Provider wraps the app)
- ✅ useReducer: Task + Favorites state with actions:
  - TASK_ADD, TASK_TOGGLE_DONE, TASK_DELETE
  - FAV_TOGGLE, FAV_CLEAR
- ✅ useMemo:
  - Board: memoized filtered + searched task list
  - Analytics: memoized derived stats (completion rate, counts, top tag)

## Setup
```bash
npm install
npm run dev
