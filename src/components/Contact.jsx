import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Heart,
  Star,
  Calendar
} from 'lucide-react';
import personalInfo from '../data/personal-info.json';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault(); // evita o comportamento padrão do "tel:"
    navigator.clipboard.writeText(personalInfo.phone)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // volta ao normal após 2s
      })
      .catch((err) => console.error("Erro ao copiar para clipboard:", err));
  };

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      link: `https://mail.google.com/mail/?view=cm&to=${personalInfo.email}`,
      description: 'Mande um email'
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      description: 'Ligue para mim'
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: personalInfo.location,
      link: '#',
      description: 'Brasil'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: personalInfo.socialMedia.github,
      color: '#333'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: personalInfo.socialMedia.linkedin,
      color: '#0077b5'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      url: personalInfo.socialMedia.instagram,
      color: '#E4405F'
    }
  ];

  return (
    <motion.div
      className="page contact-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="contact-container">
        <motion.div
          className="contact-header"
          variants={itemVariants}
        >
          <h2 className="section-title">Vamos Conversar!</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Interessado em trabalhar juntos? Adoraria saber mais sobre seu projeto!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={itemVariants}
          >
            <div className="contact-card">
              <h3 className="contact-subtitle">Informações de Contato</h3>

              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.link}
                    onClick= {method.label === "Telefone" ? handleCopy : null}
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="method-icon">
                      <method.icon size={20} />
                    </div>
                    <div className="method-content">
                      <span className="method-label">{method.label}</span>
                      <span className="method-value">{method.value}</span>
                      <span className="method-description">{method.description}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="social-section">
                <h4 className="social-title">Conecte-se comigo</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button"
                      style={{ '--social-color': social.color }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <social.icon size={24} />
                      <span>{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div
                className="availability-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="availability-header">
                  <Calendar size={20} />
                  <h4>Disponibilidade</h4>
                </div>
                <p className="availability-text">
                  Disponível para novos projetos e oportunidades de trabalho
                </p>
                <div className="availability-status">
                  <div className="status-dot"></div>
                  <span>Online agora</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/*
          <motion.div 
            className="contact-form-section"
            variants={itemVariants}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">Envie uma Mensagem</h3>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Assunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Assunto da sua mensagem"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Conte-me sobre seu projeto ou ideia..."
                />
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
           */}
        </div>

        <motion.div
          className="contact-footer"
          variants={itemVariants}
        >
          <div className="footer-content">
            <p className="footer-text">
              Obrigado por visitar meu portfolio!
              <Heart className="heart-icon" size={16} />
            </p>
            <p className="footer-subtext">
              Vamos construir algo incrível juntos
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;