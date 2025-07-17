"use client";

import React, { useState, useEffect } from 'react';
import TeamMember from './TeamMember';
import TestimonialsSection from './TestimonialsSection';
import VolunteerStoriesSection from './VolunteerStoriesSection';
import Navbar from '@/components/common/Navbar';
import NumberFlow, { continuous } from '@number-flow/react';
import { useInView } from 'react-intersection-observer';

const GlassContainer = ({ children, className = "" }) => (
  <div className={`bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 mx-2 sm:mx-6 lg:mx-16 ${className}`}>
    {children}
  </div>
);

const TeamSection = () => (
  <GlassContainer>
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">Our Team</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <TeamMember image="https://avatars.githubusercontent.com/u/64138517?v=4" name="Obaidur Rahman" role="Founder" />
      <TeamMember image="https://avatars.githubusercontent.com/u/107170785?v=4" name="Sanidhya Ravi" role="Project Manager" />
      <TeamMember image="/logo.png" name="John Doe" role="Volunteer Coordinator" />
    </div>
  </GlassContainer>
);

const impactData = [
  { title: 'Beaches Cleaned', startValue: 0, endValue: 1150 },
  { title: 'Trees Planted', startValue: 0, endValue: 200000 },
  { title: 'Volunteers', startValue: 0, endValue: 15000 },
];

const ImpactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animatedValues, setAnimatedValues] = useState(
    impactData.map((item) => item.startValue)
  );

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setAnimatedValues(impactData.map((item) => item.endValue));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  return (
    <section className="py-12" ref={ref}>
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Our Impact</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
        {impactData.map((item, index) => (
          <div key={index} className="bg-white/60 backdrop-blur-lg p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
            <NumberFlow
              plugins={[continuous]}
              value={animatedValues[index]}
              className="text-3xl font-bold text-green-600"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-yellow-100 py-8 sm:py-12">
      {/* Navigation Bar */}
      <Navbar />

      {/* Impact Section */}
      <GlassContainer>
        <ImpactSection />
      </GlassContainer>

      {/* Team Members Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <GlassContainer>
        <TestimonialsSection />
      </GlassContainer>

      {/* Volunteer Stories Section */}
      <GlassContainer>
        <VolunteerStoriesSection />
      </GlassContainer>
    </div>
  );
};

export default AboutPage;