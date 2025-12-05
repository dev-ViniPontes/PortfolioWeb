import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Star, Zap } from 'lucide-react';
import projects from '../data/projects.json';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.featured === (selectedFilter === 'featured'));

  const filters = [
    { id: 'all', label: 'Todos', count: projects.length },
    { id: 'featured', label: 'Destaques', count: projects.filter(p => p.featured).length }
  ];

  return (
    <motion.div 
      className="page projects-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          variants={itemVariants}
        >
          <h2 className="section-title">Meus Projetos</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Uma seleção dos meus melhores trabalhos e projetos pessoais
          </p>
        </motion.div>

        <motion.div 
          className="projects-filters"
          variants={itemVariants}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{filter.label}</span>
              <span className="filter-count">{filter.count}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="projects-grid"
            key={selectedFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={itemVariants}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -5, scale: 1.02 }}
                layout
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button primary"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={18} />
                        <span>Ver Site</span>
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button secondary"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={18} />
                        <span>Código</span>
                      </motion.a>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="featured-badge">
                      <Star size={14} />
                      <span>Destaque</span>
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-duration">
                      <Calendar size={14} />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <motion.div 
                    className="project-footer"
                    initial={{ opacity: 0.8 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0.8,
                      x: hoveredProject === project.id ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="view-project">
                      Ver Detalhes
                      <Zap size={14} className="inline-icon" />
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="projects-footer"
          variants={itemVariants}
        >
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">📁</div>
              <div className="stat-content">
                <span className="stat-number">{projects.length}+</span>
                <span className="stat-label">Projetos</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <span className="stat-number">{projects.filter(p => p.featured).length}</span>
                <span className="stat-label">Destaques</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Responsivos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;