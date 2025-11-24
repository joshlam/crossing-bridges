import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
  ChevronRight,
  Gift,
  Music,
  HandHeart,
  ArrowRight,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Navigation Items
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "mission", label: "Our Mission" },
    { id: "trips", label: "Mission Trips" },
    { id: "contact", label: "Get Involved" },
  ];

  // Data from Flyer
  const pastTrips = [
    {
      date: "June 22, 2024",
      title: "The First Crossing",
      desc: "Our ministry came alive! Launching with obedience to God's calling.",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "August 24, 2024",
      title: "2nd Mission Trip",
      desc: "Back to school blessings and continued support.",
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "October 12, 2024",
      title: "3rd Mission Trip",
      desc: "Deepening connections and sharing the Word.",
      img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "November 9, 2024",
      title: "4th Mission Trip",
      desc: "Thanksgiving preparations and gratitude.",
      img: "https://images.unsplash.com/photo-1511632765486-a01980968a0c?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "December 21, 2024",
      title: "5th Trip to TJ",
      desc: "Christmas joy for the orphans.",
      img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-amber-600" />,
      title: "Compassion",
      desc: "Serving with a pure heart.",
    },
    {
      icon: <Users className="w-6 h-6 text-amber-600" />,
      title: "Community",
      desc: "Connecting to share God's love.",
    },
    {
      icon: <HandHeart className="w-6 h-6 text-amber-600" />,
      title: "Stewardship",
      desc: "Managing resources to bless others.",
    },
    {
      icon: <Gift className="w-6 h-6 text-amber-600" />,
      title: "Generosity",
      desc: "Giving freely as we have received.",
    },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <span className="text-xl md:text-2xl font-serif font-bold text-amber-600 tracking-wide">
                CROSSING BRIDGES
              </span>
              <span className="ml-2 text-xs md:text-sm font-light text-slate-500 block">
                WITH JESUS
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-slate-600 hover:text-amber-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
              >
                Donate
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-amber-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 bg-amber-500 text-white px-3 py-3 rounded-md text-base font-medium"
              >
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 flex-shrink-0">
        <div className="h-[600px] w-full relative overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2000&auto=format&fit=crop"
            alt="Volunteers helping children"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-center text-white">
            <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 uppercase">
              James 1:27
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Serving with the <br />{" "}
              <span className="text-amber-400">Heart of God</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-100 mb-10 font-light">
              "Pure and undefiled religion before God and the Father is this: to
              visit orphans and widows in their trouble..."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform hover:scale-105 shadow-lg"
              >
                Join Our Next Trip
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <div className="bg-amber-600 text-white py-8 px-4 text-center">
        <p className="text-lg md:text-xl font-serif italic max-w-4xl mx-auto">
          "For many are called, but few are chosen."{" "}
          <span className="text-amber-200 not-italic text-sm ml-2 font-sans tracking-wider uppercase">
            — Matthew 22:14
          </span>
        </p>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image / Visual */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-amber-100 rounded-2xl z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1000&auto=format&fit=crop"
                alt="Jazmin Aguilar Founder"
                className="relative z-10 rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg z-20 max-w-xs hidden md:block">
                <p className="font-serif text-lg italic text-slate-700">
                  "Here I am Lord, send me."
                </p>
                <p className="text-amber-600 text-sm font-bold mt-2">
                  — Jazmin Aguilar
                </p>
              </div>
            </div>

            {/* Founder Story */}
            <div>
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                Established June 22, 2024
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6">
                Our Story Begins with Obedience
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                God began to speak to our founder,{" "}
                <strong>Jazmin Aguilar</strong>, through His word and in dreams,
                calling her to seek after the orphans.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                With a heart full of faith, she responded,{" "}
                <em>"Here I am Lord, send me."</em> With the help of volunteer
                members from Free Chapel,{" "}
                <strong>Crossing Bridges with Jesus</strong> came alive to give
                God the glory.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-amber-500">
                  <h3 className="font-bold text-slate-800 mb-2">Our Vision</h3>
                  <p className="text-sm text-slate-600">
                    Serving with the heart of God. Where every child thrives,
                    feels accepted, and belongs.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-bold text-slate-800 mb-2">Our Mission</h3>
                  <p className="text-sm text-slate-600">
                    To meet a need, provide loving care, and empower children to
                    become future leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-800">
              Our Core Values
            </h2>
            <p className="text-slate-500 mt-2">
              Bible Based | In Faith | In Hope | With Respect
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="bg-amber-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do / Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">
              Our Ministry in Tijuana
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600">
              We focus on meeting both physical and spiritual needs, ensuring
              these children know they have a predestined purpose God created
              them for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop"
                  alt="Food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <HandHeart size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Nourishment
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Groceries & Meals
                </h3>
                <p className="text-slate-600">
                  We buy groceries and cook fresh, home-cooked meals, ensuring
                  every child goes to sleep with a full stomach.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511632765486-a01980968a0c?q=80&w=800&auto=format&fit=crop"
                  alt="Worship"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <Music size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Spiritual Growth
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Worship & The Word
                </h3>
                <p className="text-slate-600">
                  Teaching spiritual development and sharing the love of Jesus
                  through worship, prayer, and bible lessons.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800&auto=format&fit=crop"
                  alt="Gifts"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-amber-600">
                  <Gift size={20} />
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Joy
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Gifts & Activities
                </h3>
                <p className="text-slate-600">
                  Organizing games, children's activities, and bringing gifts to
                  let kids be kids and feel special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Timeline Section */}
      <section id="trips" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800">
              Our Journey So Far
            </h2>
            <p className="text-slate-500 mt-2">2024 Mission Highlights</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-slate-300 transform -translate-x-1/2 hidden md:block"></div>
            <div className="absolute left-4 h-full w-0.5 bg-slate-300 md:hidden"></div>

            <div className="space-y-12">
              {pastTrips.map((trip, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Date Bubble (Center) */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-sm z-10"></div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-right md:text-right">
                    <div
                      className={`${
                        index % 2 !== 0 ? "md:text-left md:pl-12 md:pr-0" : ""
                      }`}
                    >
                      <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <span className="text-amber-600 font-bold text-sm tracking-wide block mb-1">
                          {trip.date}
                        </span>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          {trip.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {trip.desc}
                        </p>
                        {/* Placeholder for actual photo from flyer */}
                        <div className="w-full h-40 bg-slate-200 rounded-lg overflow-hidden">
                          <img
                            src={trip.img}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer for alternating layout */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Donate Section */}
      <section
        id="contact"
        className="py-20 bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Get Involved
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Are you ready to build the leaders of tomorrow? We need cooks,
                worship leaders, and generous hearts.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-slate-300">714-310-6167</p>
                    <p className="text-sm text-slate-500">Jazmin Aguilar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-slate-300">jzmgarcia@yahoo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Calendar className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Upcoming Mission</h4>
                    <p className="text-slate-300">Next Trip to TJ: TBD 2025</p>
                    <button className="mt-2 text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1">
                      View Calendar <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="font-bold">f</span> Jazmin Aguilar-Crossing
                  Bridges with Jesus
                </a>
              </div>
            </div>

            {/* Donation / Contact Form Card */}
            <div className="bg-white text-slate-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="I'd like to volunteer..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-center text-sm font-semibold text-slate-500 mb-3">
                  Support the Mission
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                    Zelle
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 py-2 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                    Venmo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Crossing Bridges with Jesus. All
            rights reserved.
          </p>
          <p>Founded by Jazmin Aguilar | Tijuana, Mexico Mission</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
