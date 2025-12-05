import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import experiences from '../data/experiences.json';

const Experience = () => {
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [filter, setFilter] = useState('all');

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

  const filteredExperiences = filter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === filter);

  const toggleExpanded = (id) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const calculateDuration = (startDate, endDate) => {
    if (!endDate) return 'Presente';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return months > 0 ? `${years}a ${months}m` : `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
  };

  return (
    <motion.div 
      className="page experience-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="experience-container">
        <motion.div 
          className="experience-header"
          variants={itemVariants}
        >
          <h2 className="section-title">Experiência Profissional</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Minha jornada profissional e as conquistas ao longo do caminho
          </p>
        </motion.div>

        <motion.div 
          className="experience-filters"
          variants={itemVariants}
        >
          <motion.button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todas
          </motion.button>
          <motion.button
            className={`filter-button ${filter === 'Tempo Integral' ? 'active' : ''}`}
            onClick={() => setFilter('Tempo Integral')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tempo Integral
          </motion.button>
          <motion.button
            className={`filter-button ${filter === 'Freelance' ? 'active' : ''}`}
            onClick={() => setFilter('Freelance')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Freelance
          </motion.button>
        </motion.div>

        <motion.div 
          className="timeline-container"
          variants={containerVariants}
        >
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              className="timeline-item"
              variants={itemVariants}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`timeline-content ${experience.current ? 'current' : ''}`}>
                <div className="experience-card">
                  <div className="card-header">
                    <div className="experience-icon">
                      <Briefcase size={20} />
                    </div>
                    <div className="experience-basic-info">
                      <h3 className="experience-position">{experience.position}</h3>
                      <h4 className="experience-company">{experience.company}</h4>
                      <div className="experience-meta">
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="meta-item">
                          <Clock size={14} />
                          <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
                        </div>
                        <div className="meta-item">
                          <MapPin size={14} />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    {experience.current && (
                      <div className="current-badge">
                        <div className="pulse-dot"></div>
                        <span>Atual</span>
                      </div>
                    )}
                  </div>

                  <p className="experience-description">{experience.description}</p>

                  <div className="experience-technologies">
                    <h5 className="tech-label">Tecnologias:</h5>
                    <div className="tech-tags">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="tech-tag"
                          whileHover={{ scale: 1.05, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className="expand-button"
                    onClick={() => toggleExpanded(experience.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Ver Conquistas</span>
                    {expandedExperience === experience.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {expandedExperience === experience.id && (
                      <motion.div
                        className="achievements-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h5 className="achievements-title">
                          <Award size={16} />
                          Principais Conquistas
                        </h5>
                        <ul className="achievements-list">
                          {experience.achievements.map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              className="achievement-item"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: achIndex * 0.1 }}
                            >
                              <TrendingUp size={14} className="achievement-icon" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="experience-stats"
          variants={itemVariants}
        >
          <h3 className="stats-title">Resumo da Carreira</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📈</div>
              <span className="stat-number">{experiences.length}</span>
              <span className="stat-label">Empregos</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <span className="stat-number">{experiences.filter(e => e.current).length}</span>
              <span className="stat-label">Atual</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🚀</div>
              <span className="stat-number">5+</span>
              <span className="stat-label">Anos</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Sucesso</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;