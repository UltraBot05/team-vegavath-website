"use client";

import { useState, useEffect } from "react";
import { RacingCursor } from "./RacingCursor";
import CursorToggle from "./CursorToggle";

export function CursorControls() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("racing-cursor");
      setEnabled(stored !== null ? JSON.parse(stored) : false);
    } catch {
      setEnabled(false);
    }
  }, []);

  if (!mounted) return null;

  const handleToggle = (val: boolean) => {
    setEnabled(val);
    try {
      localStorage.setItem("racing-cursor", JSON.stringify(val));
    } catch {}
  };

  return (
    <>
      <RacingCursor enabled={enabled} />
      <CursorToggle enabled={enabled} onToggle={handleToggle} />
    </>
  );
}
