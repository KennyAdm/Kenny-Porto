import React, { useState, useEffect, useCallback } from "react";
import { Home, Code2, Briefcase, GraduationCap, Laptop, Mail, Menu, BadgeCheck } from "lucide-react";

const navLinks = [
  { id: "home", icon: Home, text: "Home" },
  { id: "skills", icon: Code2, text: "Skills" },
  { id: "education", icon: GraduationCap, text: "Education" },
  { id: "certifications", icon: BadgeCheck, text: "Certifications" },
  { id: "experience", icon: Briefcase, text: "Experience" },
  { id: "projects", icon: Laptop, text: "Projects" },
  { id: "contact", icon: Mail, text: "Contact" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveLink(id);
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const observers = navLinks
      .map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return null;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveLink(id);
          },
          { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
        );
        observer.observe(el);
        return observer;
      })
      .filter(Boolean);

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
      <div className="md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
        <div className="p-[2px] md:rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x">
          <nav className="bg-gray-900/90 backdrop-blur-md md:rounded-full px-4 md:px-6 py-2.5">
            <div className="flex justify-between items-center md:hidden px-2">
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className="text-white font-bold"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-3"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 lg:gap-2 py-4 md:py-0">
                {navLinks.map(({ id, icon: Icon, text }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className={`px-3 py-2 md:py-1.5 rounded-lg md:rounded-full text-sm font-medium
                      transition-all duration-300 flex items-center gap-2
                      hover:bg-white/10 
                      ${
                        activeLink === id
                          ? "bg-white/15 text-white"
                          : "text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      className={`text-base ${
                        activeLink === id ? "scale-110" : ""
                      }`}
                    />
                    <span className="inline">{text}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </header>
  );
}
