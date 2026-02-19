import { useCallback, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const show = useCallback((message, type = "info") => {
    const id = crypto?.randomUUID?.() || String(Date.now());
    setToast({ id, message, type });
    window.clearTimeout(show._t);
    show._t = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const clear = useCallback(() => setToast(null), []);

  return { toast, show, clear };
}
