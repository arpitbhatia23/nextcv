"use client";

import { useCallback, useRef, useState } from "react";

export function useSwipeableTabs(tabs, initialTab) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [direction, setDirection] = useState(0);
  const startPoint = useRef(null);

  const goToTab = useCallback(
    nextTab => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);

      const nextIndex =
        typeof nextTab === "number" ? nextTab : tabs.findIndex(tab => tab.id === nextTab);

      if (nextIndex < 0 || nextIndex >= tabs.length || nextIndex === currentIndex) {
        return;
      }

      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActiveTab(tabs[nextIndex].id);
    },
    [activeTab, tabs]
  );

  const swipeHandlers = {
    onPointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      startPoint.current = {
        x: event.clientX,
        y: event.clientY,
        pointerId: event.pointerId,
      };

      event.currentTarget.setPointerCapture?.(event.pointerId);
    },

    onPointerUp(event) {
      const start = startPoint.current;
      if (!start || start.pointerId !== event.pointerId) return;

      startPoint.current = null;

      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;

      // Ignore short gestures and predominantly vertical scrolling.
      if (Math.abs(deltaX) < 70 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
        return;
      }

      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);

      if (deltaX < 0) {
        goToTab(currentIndex + 1);
      } else {
        goToTab(currentIndex - 1);
      }
    },

    onPointerCancel() {
      startPoint.current = null;
    },

    onLostPointerCapture() {
      startPoint.current = null;
    },
  };
  const variants = {
    enter: dir => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: dir => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return {
    activeTab,
    direction,
    goToTab,
    swipeHandlers,
    variants,
  };
}
