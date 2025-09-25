import { useEffect, useRef, useState } from "react";

export function useExpiresIn(countdown: number) {
  const [seconds, setSeconds] = useState(countdown);
  const counter = useRef<NodeJS.Timeout | null>(null);
  const isExpires = seconds <= 0;

  useEffect(() => {
    if (!isExpires) {
      counter.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (counter.current) {
        clearInterval(counter.current);
        counter.current = null;
      }
    };
  });

  return [isExpires, seconds] as const;
}
