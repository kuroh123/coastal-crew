"use client";

import React from 'react';
import Navbar from '@/components/common/Navbar';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    e.target.reset();
  };

  return (
        <div className="min-h-screen bg-teal-100">
      {/* Navbar */}
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-white flex items-center justify-center">
      <div className="container mx-auto py-12">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-teal-700">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-2xl border border-teal-300">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 mb-2 font-semibold">Name</label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-300" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-300" />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 mb-2 font-semibold">Subject</label>
            <input type="text" id="subject" name="subject" required className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-300" />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2 font-semibold">Phone Number (optional)</label>
            <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-300" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2 font-semibold">Message</label>
            <textarea id="message" name="message" required rows="4" className="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-300"></textarea>
          </div>
          <div className="mb-6 flex items-center">
            <input type="checkbox" id="consent" name="consent" required className="mr-2" />
            <label htmlFor="consent" className="text-gray-700 font-semibold">I agree to the privacy policy and terms of service</label>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-lg hover:from-teal-600 hover:to-teal-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
