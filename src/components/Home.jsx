import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Zap, Heart } from 'lucide-react';
import personalInfo from '../data/personal-info.json';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = personalInfo.description;
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const typeText = () => {
      if (isTyping) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
          timeout = setTimeout(typeText, 50);
        } else {
          setIsTyping(false);
        }
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, [displayText, fullText, isTyping]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      className="page home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={itemVariants}
        >
          <motion.h1 
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="title-main">Olá, eu sou</span>
            <motion.span 
              className="title-name"
              whileHover={{ scale: 1.05 }}
            >
              {personalInfo.name}
            </motion.span>
          </motion.h1>

          <motion.div 
            className="hero-subtitle"
            variants={itemVariants}
          >
            <span className="subtitle-text">{personalInfo.title}</span>
          </motion.div>

          <motion.div 
            className="hero-description"
            variants={itemVariants}
          >
            <p className="description-text">
              {displayText}
              {isTyping && <span className="cursor">|</span>}
            </p>
          </motion.div>

          <motion.div 
            className="hero-features"
            variants={itemVariants}
          >
            <div className="feature-item">
              <Code className="feature-icon" size={24} />
              <span>Desenvolvimento Full Stack</span>
            </div>
            <div className="feature-item">
              <Zap className="feature-icon" size={24} />
              <span>Soluções Escaláveis</span>
            </div>
            <div className="feature-item">
              <Heart className="feature-icon" size={24} />
              <span>Apaixonado por Tecnologia</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Projetos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Tecnologias</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="code-card">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>
            <div className="code-content">
              <pre>
                <code>{`const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.title}",
  skills: ${JSON.stringify(personalInfo.skills.slice(0, 4), null, 2)},
  passion: "building amazing things"
};`}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="scroll-text">Navegue pelo portfolio</span>
          <ChevronDown className="scroll-arrow" size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;