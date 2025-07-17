"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/common/HeroSection';
import FeaturesSection from '@/components/common/FeaturesSection';
import FeaturedEventsSection from '@/app/featuredevents/FeaturedEvents';
import AboutUs from '@/app/about/AboutUs';
import TestimonialsSection from '@/app/about/TestimonialsSection';
import NumberFlow, { continuous } from '@number-flow/react';
import { useInView } from 'react-intersection-observer';

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
    <section className="py-12 bg-gold-teal-gradient" ref={ref}>
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Our Impact</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
        {impactData.map((item, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow text-center">
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

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-teal-gold-gradient">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutUs />

      {/* Impact Section */}
      <ImpactSection />

      {/* Featured Events */}
      <FeaturedEventsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="mb-6">Become a volunteer today and make a difference in your community.</p>
          <a href="/register" className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
            Join the Movement
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" />
                </div>
              </motion.div>
              <span className="ml-2 text-xl font-bold">Sproutify</span>
            </div>
            <p className="text-gray-400">
              Empowering activists to host environmental activities and volunteers to join the cause.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
