import React from "react";
import Hero from "./components/Hero";
import "./assets/css/index.css";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Projects from "./components/Projects";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Skills />
      <Education />
      <Certifications />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
