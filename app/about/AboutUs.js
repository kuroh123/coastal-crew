import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <section id="about-us" className="py-20 bg-teal-gold-gradient">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-12 lg:mb-16">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Column */}
          <div className="flex flex-col justify-start items-start">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/65272e44bd4f9022f58884d2/1702591117221-8YP0K9IP9GWZXZWLCXJ3/Option%2B2-2%2B%281%29.png"
              alt="About Us Image"
              width={800}
              height={600}
              className="rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>

          {/* Text Column */}
          <div className="flex flex-col justify-center items-start">
            <p className="text-lg lg:text-xl text-gray-800 mb-6 lg:mb-8 leading-relaxed tracking-wide">
              We are a passionate group of volunteers dedicated to preserving and enhancing the beauty and health of our beaches. Our mission is to educate, engage, and empower our community to take an active role in maintaining clean and sustainable coastal environments.
            </p>
            <a
              href="/about"
              className="mt-4 lg:mt-6 inline-block py-2 px-6 bg-blue-500 text-white font-medium rounded-xl shadow-lg transform hover:bg-blue-600 hover:shadow-xl transition duration-300 ease-in-out"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;