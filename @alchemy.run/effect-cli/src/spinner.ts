import { useEffect, useState } from "react";

const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function useGlobalSpinner(intervalMs = 80): string {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % spinnerFrames.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return spinnerFrames[index];
}
