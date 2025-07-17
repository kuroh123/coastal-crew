import {
  Calendar,
  Users,
  Leaf,
  Award,
  MessageCircle,
  BookOpen,
} from "lucide-react";

const Feature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-4 md:p-6 text-center bg-white rounded-lg shadow">
    <Icon className="w-8 h-8 text-blue-600 mb-2" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-700 mt-2">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gold-teal-gradient">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <p className="mt-4 text-xl text-gray-700">
          What makes Coastal Crew special:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Event Hosting */}
        <Feature
          icon={Calendar}
          title="Event Hosting"
          description="Easily create and manage environmental activities."
        />

        {/* Volunteer Management */}
        <Feature
          icon={Users}
          title="Volunteer Management"
          description="Track and manage volunteers who join your activities."
        />

        {/* Impact Tracking */}
        <Feature
          icon={Leaf}
          title="Impact Tracking"
          description="Monitor the environmental impact of all activities."
        />

        {/* Tokenization System */}
        <Feature
          icon={Award}
          title="Tokenization System"
          description="Earn eco-tokens for your contributions to the environment."
        />

        {/* Community Forum */}
        <Feature
          icon={MessageCircle}
          title="Community Forum"
          description="Connect with like-minded individuals in our community forum."
        />

        {/* Resource Library */}
        <Feature
          icon={BookOpen}
          title="Resource Library"
          description="Access educational resources and guides for environmental activism."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
