import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import personalInfo from '../data/personal-info.json';

const Navigation = ({ sections, currentSection, onSectionChange }) => {
  const socialLinks = [
    { icon: Github, url: personalInfo.socialMedia.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.socialMedia.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: personalInfo.socialMedia.instagram, label: 'Instagram' },
    { icon: Mail, url: personalInfo.socialMedia.email, label: 'Email' },
  ];

  return (
    <motion.nav 
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">{personalInfo.name}</span>
          <span className="logo-accent">{personalInfo.title}</span>
        </motion.div>

        <div className="nav-menu">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`nav-item ${currentSection === index ? 'active' : ''}`}
              onClick={() => onSectionChange(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-label">{section.label}</span>
              {currentSection === index && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="social-links">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;