import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Mail, Phone, Award } from 'lucide-react';
import personalInfo from '../data/personal-info.json';

const About = () => {
  const [copied, setCopied] = useState(false);

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



  const handleCopy = (e) => {
    e.preventDefault(); // evita o comportamento padrão do "tel:"
    navigator.clipboard.writeText(personalInfo.phone)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // volta ao normal após 2s
      })
      .catch((err) => console.error("Erro ao copiar para clipboard:", err));
  };

  return (
    <motion.div
      className="page about-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="about-container">
        <motion.div
          className="about-header"
          variants={itemVariants}
        >
          <h2 className="section-title">Sobre Mim</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-info"
            variants={itemVariants}
          >
            <div className="profile-section">
              <div className="profile-card">
                <div className="profile-avatar">
                  <div className="avatar-placeholder">
                    <span>{personalInfo.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="profile-details">
                  <h3 className="profile-name">{personalInfo.name}</h3>
                  <p className="profile-title">{personalInfo.title}</p>
                  <div className="profile-location">
                    <MapPin size={16} />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <a href={`https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href={`tel:${personalInfo.phone}`} onClick={handleCopy} style={{ position: "relative" }}>
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-description"
            variants={itemVariants}
          >
            <h3>Minha Jornada</h3>
            <p className="description-text">
              {personalInfo.description}
            </p>
            <p className="description-text">
              Ao longo da minha trajetória, participei de diversos projetos que me motivaram a explorar novas tecnologias, linguagens, modelos de IA, bibliotecas e metodologias. Cada novo aprendizado só aumentou minha paixão por desenvolvimento e meu interesse em compartilhar conhecimento com outras pessoas. Pretendo continuar participando de projetos que me desafiem, ampliem minhas habilidades e contribuam para minha evolução profissional.
            </p>
          </motion.div>

          <motion.div
            className="education-section"
            variants={itemVariants}
          >
            <h3 className="section-subtitle">
              <GraduationCap size={20} />
              Formação Acadêmica
            </h3>
            <div className="education-list">
              {personalInfo.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-header">
                    <h4 className="degree">{edu.degree}</h4>
                    <span className="year">{edu.year}</span>
                  </div>
                  <p className="institution">{edu.institution}</p>
                  <p className="education-description">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skills-section"
            variants={itemVariants}
          >
            <h3 className="section-subtitle">
              <Award size={20} />
              Tecnologias & Skills
            </h3>
            <div className="skills-grid">
              {personalInfo.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill-tag"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="philosophy-section"
            variants={itemVariants}
          >
            <h3 className="section-subtitle">Minha Filosofia</h3>
            <div className="philosophy-cards">
              <div className="philosophy-card">
                <div className="card-icon">🚀</div>
                <h4>Inovação</h4>
                <p>Sempre buscando as melhores e mais modernas soluções tecnológicas</p>
              </div>
              <div className="philosophy-card">
                <div className="card-icon">⚡</div>
                <h4>Performance</h4>
                <p>Desenvolvendo aplicações rápidas e escaláveis</p>
              </div>
              <div className="philosophy-card">
                <div className="card-icon">🎯</div>
                <h4>Qualidade</h4>
                <p>Entregando código limpo, bem estruturado e bem testado</p>
              </div>
            </div>
          </motion.div>
        </div >
      </div >
    </motion.div >
  );
};

export default About;