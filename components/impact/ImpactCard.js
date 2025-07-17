"use client";

import React, { useEffect, useState } from "react";
import NumberFlow, { continuous } from "@number-flow/react";
import { useInView } from "react-intersection-observer";

const ImpactCard = ({ title, startValue, endValue }) => {
  const [value, setValue] = useState(startValue);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Adjust based on your layout
  });

  useEffect(() => {
    if (inView) {
      setValue(endValue);
      console.log(inView)
    }
  }, [inView, endValue]);

  return (
    <div ref={ref} className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <NumberFlow
        value={value}
        plugins={[continuous]}
        // Optional formatting (e.g., 1,000 instead of 1000)
        format={(n) => n.toLocaleString()}
      />
    </div>
  );
};

export default ImpactCard;