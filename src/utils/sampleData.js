export function seedTasks() {
  return [
    { id: "t1", title: "Add Router pages (Home / Board / Analytics)", tag: "react", done: true, createdAt: Date.now() - 86400000 },
    { id: "t2", title: "Implement useContext for theme + user", tag: "hooks", done: false, createdAt: Date.now() - 5400000 },
    { id: "t3", title: "Implement useReducer actions + favorites", tag: "hooks", done: false, createdAt: Date.now() - 3200000 },
    { id: "t4", title: "UseMemo for analytics + filters", tag: "optimization", done: false, createdAt: Date.now() - 2100000 },
  ];
}
