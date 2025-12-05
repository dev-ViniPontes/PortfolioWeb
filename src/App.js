import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './App.css';

const sections = [
  { id: 'home', label: 'Início', component: Home },
  { id: 'about', label: 'Sobre', component: About },
  { id: 'projects', label: 'Projetos', component: Projects },
  { id: 'experience', label: 'Experiência', component: Experience },
  { id: 'contact', label: 'Contato', component: Contact },
];

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 15 : -15
  }),
  in: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0
  },
  out: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 15 : -15
  })
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8
};

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setDirection(1);
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setDirection(-1);
      setCurrentSection(currentSection - 1);
    }
  };

  const goToSection = (index) => {
    if (index !== currentSection) {
      setDirection(index > currentSection ? 1 : -1);
      setCurrentSection(index);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection]);

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="app">
      <Navigation 
        sections={sections}
        currentSection={currentSection}
        onSectionChange={goToSection}
      />
      
      <main className="main-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="page-container"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="navigation-dots">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSection ? 'active' : ''}`}
            onClick={() => goToSection(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
