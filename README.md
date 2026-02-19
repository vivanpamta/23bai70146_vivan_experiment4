Project Name:Smart Taskboard (Experiment 4) — a mini productivity app to manage tasks with a professional UI.

What is implemented (as per Experiment-4 guide):
1) React Router (Multi-page): Pages created and routed using react-router-dom:
Home: intro + quick summary + buttons to navigate
Board: add/edit/delete/toggle/favorite tasks
Analytics: shows stats derived from tasks

2) useContext (Global state):A Context Provider wraps the whole app and provides:
Theme state (dark/light)
User info (name, role)
Reducer state + dispatch (tasks, favorites)


3) useReducer (Centralized task management):Tasks and favorites are controlled by a reducer (predictable state updates).

State contains:
tasks[] → each task has id, title, tag, done, createdAt
favorites{} → object map { taskId: true }

Reducer actions used:
TASK_ADD → add a new task
TASK_TOGGLE_DONE → mark task done/pending
TASK_EDIT → edit title/tag
TASK_DELETE → delete task
FAV_TOGGLE → add/remove favorite
FAV_CLEAR → clear all favorites
HYDRATE → load saved state from localStorage on startup

4) useMemo (Performance optimization):useMemo is used to avoid re-calculating heavy derived values:

✅ Board page
Memoized task list after applying:
search
filter (all / done / pending / favorites)
sorting (newest / oldest / done first)

✅ Analytics page
Memoized derived analytics:
total tasks
completed
pending
favorites count
completion percentage
tasks grouped by tag + top tag


Folder Structure:
exp4-smart-taskboard/
│
├── node_modules/            # Installed npm packages (auto-generated, do NOT upload)
│
├── public/                  # Static files
│   └── vite.svg
│
├── screenshots/            # Screenshots for submission
│   ├── Home.png
│   ├── Board.png
│   └── Analytics.png
│
├── src/                    # Main source code
│
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── UserBadge.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── StatCard.jsx
│   │   └── Toast.jsx
│   │
│   ├── pages/             # Pages used by React Router
│   │   ├── Home.jsx
│   │   ├── Board.jsx
│   │   └── Analytics.jsx
│   │
│   ├── context/           # Global state using useContext
│   │   └── AppContext.jsx
│   │
│   ├── reducer/           # Reducer logic using useReducer
│   │   └── taskReducer.js
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebouncedValue.js
│   │   └── useToast.js
│   │
│   ├── utils/             # Utility/helper functions
│   │   ├── storage.js
│   │   ├── format.js
│   │   └── sampleData.js
│   │
│   ├── constants/         # Constants used in project
│   │   └── actions.js
│   │
│   ├── App.jsx            # Main component with Router
│   ├── main.jsx           # Entry point (renders App)
│   └── styles.css         # Full styling
│
├── .gitignore             # Files ignored by Git
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── vite.config.js         # Vite configuration
└── README.md              # Project description
