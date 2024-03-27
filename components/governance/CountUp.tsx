import React, { useState, useEffect } from "react";
import { numberFormat } from "../../utils/format";

interface CountUpProps {
  end: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const increment = end / (duration * 60); // calculate increment per frame

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount + increment < end) {
          return prevCount + increment; // increment count
        } else {
          return end; // cap count at end value
        }
      });
    }, 1000 / 60); // 60 frames per second

    return () => {
      clearInterval(interval); // clear interval on unmount
    };
  }, [end, duration, increment]);

  return <>{numberFormat(Math.floor(count).toString())}</>;
};

export default CountUp;
