import { ACTIONS } from "../constants/actions.js";

export const initialTaskState = {
  tasks: [],
  favorites: {}, // { [taskId]: true }
};

export function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.HYDRATE: {
      return action.payload ?? state;
    }

    case ACTIONS.TASK_ADD: {
      return { ...state, tasks: [action.payload, ...state.tasks] };
    }

    case ACTIONS.TASK_TOGGLE_DONE: {
      const tasks = state.tasks.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
      return { ...state, tasks };
    }

    case ACTIONS.TASK_EDIT: {
      const { id, title, tag } = action.payload;
      const tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, title, tag } : t
      );
      return { ...state, tasks };
    }

    case ACTIONS.TASK_DELETE: {
      const tasks = state.tasks.filter((t) => t.id !== action.payload);
      const favorites = { ...state.favorites };
      delete favorites[action.payload];
      return { ...state, tasks, favorites };
    }

    case ACTIONS.FAV_TOGGLE: {
      const id = action.payload;
      const favorites = { ...state.favorites };
      favorites[id] ? delete favorites[id] : (favorites[id] = true);
      return { ...state, favorites };
    }

    case ACTIONS.FAV_CLEAR: {
      return { ...state, favorites: {} };
    }

    default:
      return state;
  }
}
