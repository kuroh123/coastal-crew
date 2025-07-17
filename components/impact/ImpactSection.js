"use client";

import dynamic from "next/dynamic";
import React from "react";

// Disable SSR to avoid hydration mismatches
const ImpactCard = dynamic(() => import("./ImpactCard"), { ssr: false });

const impactData = [
  { title: "Beaches Cleaned", startValue: 0, endValue: 50 },
  { title: "Trees Planted", startValue: 0, endValue: 2000 },
  { title: "Volunteers", startValue: 0, endValue: 1500 },
];

const ImpactSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Our Impact</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
        {impactData.map((item, index) => (
          <ImpactCard
            key={index}
            title={item.title}
            startValue={item.startValue}
            endValue={item.endValue}
          />
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
