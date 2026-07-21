import { useCallback, useEffect, useState } from 'react';

// Reusable carousel state: current index, next/prev/goTo handlers, slide
// direction (for enter/exit animations), and an optional pausable auto-play.
export const useImageCarousel = (items = [], { autoPlay = true, interval = 4000, paused = false } = {}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasMultiple = items.length > 1;

  const next = useCallback(
    (event) => {
      event?.stopPropagation();
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    },
    [items.length]
  );

  const prev = useCallback(
    (event) => {
      event?.stopPropagation();
      setDirection(-1);
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    },
    [items.length]
  );

  const goTo = useCallback(
    (index) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const reset = useCallback(() => {
    setDirection(0);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    if (!autoPlay || !hasMultiple || paused) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, hasMultiple, paused, interval, items.length, activeIndex]);

  return { activeIndex, direction, hasMultiple, next, prev, goTo, reset };
};
