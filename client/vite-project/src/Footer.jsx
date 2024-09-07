import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css'; // Import your CSS file

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <h3 className="footer-title">
          <a href="#" className="footer-logo">
            <span className="footer-bracket">&lt;</span>
            Snehasish
            <span className="footer-bracket">/&gt;</span>
          </a>
        </h3>
        <div className="footer-icons">
          <a href="https://github.com/Snehasish002" className="footer-icon">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/contactsnehasish" className="footer-icon">
            <FaLinkedin />
          </a>
          <a href="#" className="footer-icon">
            <FaInstagram />
          </a>
        </div>
      </div>
      <p className="footer-copy">© snehasish-2024</p>
    </div>
  );
};

export default Footer;
