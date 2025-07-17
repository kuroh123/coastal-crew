const HeroSection = () => {
  return (
    <section className="bg-[url('/hero-bg.png')] bg-cover bg-center text-white py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Sproutify</h1>
        <p className="text-xl mb-8">Empowering activists to host environmental activities and volunteers to join the cause.</p>
        <a href="/events" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-white-100">Explore Events</a>
      </div>
    </section>
  );
};

export default HeroSection;