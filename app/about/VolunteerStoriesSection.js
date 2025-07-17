import React from 'react';

const VolunteerStoriesSection = () => {
  const volunteerStories = [
    {
      name: 'John Doe',
      image: '/volunteers/john-doe.jpg',
      story:
        'I joined Coastal Crew as a way to give back to my community and make a positive impact on the coastal environment. Since volunteering with the organization, I\'ve met amazing people, learned new skills, and gained a deeper appreciation for the beauty and importance of our coastlines.',
    },
    {
      name: 'Jane Smith',
      image: '/volunteers/jane-smith.jpg',
      story:
        'Becoming a volunteer for Coastal Crew has been one of the best decisions I\'ve ever made. I love the sense of community and purpose that comes with working alongside like-minded individuals to protect our coastlines. Each cleanup event I attend is rewarding and fulfilling, and I feel proud to be a part of something truly meaningful.',
    },
  
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Volunteer Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from our volunteers about their experiences and the impact they've
            made on their communities and our coastlines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {volunteerStories.map((story, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <img
                src={story.image}
                alt={story.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {story.name}
              </h3>
              <p className="text-gray-600">{story.story}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/volunteer"
            className="inline-block bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors"
          >
            Become a Volunteer
          </a>
        </div>
      </div>
    </section>
  );
};

export default VolunteerStoriesSection;