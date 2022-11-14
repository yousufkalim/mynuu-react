/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Animate } from 'react-move';

let interval;
function AnimatedProgress({
  duration, valueEnd, easingFunction, valueStart, progress, children,
}) {
  const [isAnimated, setIsAnimated] = useState(false);
  //   const [interval, setInterval] = useState();

  useEffect(() => {
    if (progress < 100) {
      interval = progress;
      window.setInterval(() => {
        setIsAnimated(!isAnimated);
      }, duration * 100);
    } else {
      setIsAnimated(!isAnimated);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [progress]);

  return (
    <Animate
      start={() => ({
        value: valueStart,
      })}
      update={() => ({
        value: [isAnimated ? valueEnd : valueStart],
        timing: {
          duration: duration * 100,
          ease: easingFunction,
        },
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
}

export default AnimatedProgress;
