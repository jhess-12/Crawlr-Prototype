import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import bandImg from "@assets/band_1774529933151.png";
import crowdImg from "@assets/crowd_1774529947219.png";
import dinnerImg from "@assets/dinner_1774529951002.png";
import fireworksImg from "@assets/fireworks_1774529956853.png";
import crawlrLogo from "@assets/crawlrlogo_1774529941987.png";
import phoneImg from "@assets/phone_1774529960298.png";

const carouselImages = [
  { src: bandImg, label: "Live Music" },
  { src: crowdImg, label: "Crowd Scene" },
  { src: dinnerImg, label: "Dinner Out" },
  { src: fireworksImg, label: "Fireworks" },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    city: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/home");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-[#F2D02F] px-4 py-3 flex items-center">
        <div className="flex items-center gap-2">
          <img src={crawlrLogo} alt="Crawlr logo" height={32} className="h-8 w-auto" />
        </div>
        <div className="ml-auto flex items-center gap-6">
          <a
            href="#account"
            className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity"
            data-testid="link-get-started"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity"
            data-testid="link-features"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity"
            data-testid="link-about"
          >
            About
          </a>
        </div>
      </nav>

      {/* Row One — Hero */}
      <div className="bg-black flex flex-col md:flex-row">
        <div className="flex-1 flex items-center px-6 py-12">
          <div>
            <p className="text-white text-6xl font-bold leading-tight m-0">Explore Nearby Hotspots</p>
            <p className="text-white text-6xl font-bold leading-tight m-0">Effortlessly.</p>
          </div>
        </div>
        {/* Carousel */}
        <div className="w-full md:w-2/5 relative overflow-hidden" style={{ minHeight: "320px" }}>
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${currentSlide === i ? "opacity-100" : "opacity-0"}`}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${currentSlide === i ? "bg-[#F2D02F]" : "bg-white/40"}`}
                data-testid={`carousel-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Row Two — About & Features */}
      <div className="bg-black flex flex-col md:flex-row px-6 py-8 gap-6">
        <div className="flex-1 flex flex-col gap-6">

          {/* About card */}
          <div id="about">
            <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
              <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }}>About</h1>
            </div>
            <div className="bg-white rounded-b-[18px] px-6 py-6">
              <p className="text-black text-lg m-0">
                Crawlr is a 21+ social hub, spotlighting local restaurants and bars, their events, and what your
                community has to say. Simply browse your favorite spots in your city, see what's happening, how the
                lines and ride rates are and start crawling.
              </p>
            </div>
          </div>

          {/* Features card */}
          <div id="features">
            <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
              <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }}>Features</h1>
            </div>
            <div className="bg-white rounded-b-[18px] px-6 py-6">
              <p className="text-black text-lg font-bold mb-1">Real Time Reports:</p>
              <ul className="text-black text-lg mb-4 pl-5">
                <li>Locals on Crawlr can report how long bar lines are, ride rates and more.</li>
              </ul>
              <p className="text-black text-lg font-bold mb-1">Events:</p>
              <ul className="text-black text-lg mb-4 pl-5">
                <li>Crawlr displays happy hours, live music, bar crawls, and more that restaurants and bars in a community are offering.</li>
              </ul>
              <p className="text-black text-lg font-bold mb-1">Social Feed:</p>
              <ul className="text-black text-lg pl-5">
                <li>Users can post their crawl, sharing their experience to their community.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Phone mockup */}
        <div className="flex items-center justify-center md:w-80 shrink-0">
          <img src={phoneImg} alt="Crawlr app on phone" className="h-full w-auto object-contain" style={{ maxHeight: "520px" }} />
        </div>
      </div>

      {/* Get Started card */}
      <div id="account" className="bg-black px-6 pb-10">
        <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
          <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }}>Get Started</h1>
        </div>
        <div className="bg-white rounded-b-[18px] px-6 py-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Your Information */}
              <div className="flex-1">
                <p className="font-bold text-black text-lg mb-4">Your Information</p>
                <ul className="list-none p-0 m-0 space-y-3">
                  <li className="flex items-center gap-4">
                    <label className="text-black w-36 shrink-0">Name:</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-name"
                    />
                  </li>
                  <li className="flex items-center gap-4">
                    <label className="text-black w-36 shrink-0">Phone Number:</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-phone"
                    />
                  </li>
                  <li className="flex items-center gap-4">
                    <label className="text-black w-36 shrink-0">Email:</label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-email"
                    />
                  </li>
                </ul>
              </div>

              {/* Your Profile */}
              <div className="flex-1">
                <p className="font-bold text-black text-lg mb-4">Your Profile</p>
                <ul className="list-none p-0 m-0 space-y-3">
                  <li className="flex items-center gap-4">
                    <label className="text-black w-40 shrink-0">Create Username:</label>
                    <input
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-username"
                    />
                  </li>
                  <li className="flex items-center gap-4">
                    <label className="text-black w-40 shrink-0">Create Password:</label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-password"
                    />
                  </li>
                  <li className="flex items-center gap-4">
                    <label className="text-black w-40 shrink-0">Your City:</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-1 w-64 text-black"
                      data-testid="input-city"
                    />
                  </li>
                </ul>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="font-funkydori text-black bg-[#F2D02F] border-4 border-[#F2D02F] rounded-[18px] px-10 pt-4 pb-2 hover:opacity-80 transition-opacity cursor-pointer"
                style={{ fontSize: "40px" }}
                data-testid="button-submit"
              >
                {submitted ? "Welcome to Crawlr!" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-[#F2D02F] text-center py-4 text-base">
        <p>2026 crawlr. all rights reserved.</p>
      </footer>
    </div>
  );
}
