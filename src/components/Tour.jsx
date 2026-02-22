"use client";
import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";

const Tour = ({ steps, tourId }) => {
  const [mounted, setMounted] = useState(false);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRun(false); // Reset run state on tourId change
    
    const timer = setTimeout(() => {
      const hasSeenTour = localStorage.getItem(`has-seen-tour-${tourId}`);
      if (!hasSeenTour) {
        setRun(true);
      }
    }, 500); // Small delay to wait for step component mounting
    
    return () => clearTimeout(timer);
  }, [tourId]);

  if (!mounted) return null;

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`has-seen-tour-${tourId}`, "true");
    }
  };

  return (
    <Joyride
      key={tourId}
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#4f46e5", // indigo-600
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: "left",
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
      locale={{
        last: "Finish",
        skip: "Skip Tour",
      }}
    />
  );
};

export default Tour;
