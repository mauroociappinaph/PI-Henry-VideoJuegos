import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h3 className={styles.heading}>ABOUT</h3>
          <p className={styles.description}>Mr.Mauroo , Comunication & FullStack Developer? </p>
        </div>
        <div className={styles.middleSection}>
          <h3 className={styles.heading}>Enlaces Útiles</h3>
          <ul className={styles.linksList}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/home">Home </Link>
            </li>
            <li>
              <Link to="/create">Create Videogame</Link>
            </li>
            <li>
              <a href="/contacto">Contacto</a>
            </li>
          </ul>
        </div>
        <div className={styles.rightSection}>
          <h3 className={styles.heading}>Contacto</h3>
          <p className={styles.contactInfo}>
            Dirección: Mar del Plata , Argentina
            <br />
            Teléfono: +54 223 5 916616
            <br />
            Correo Electrónico: ciappinamaurooj@gmail.com
          </p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p className={styles.copyRight}>
          &copy; 2023 Sitio Web. Todos los derechos reservados.
        </p>
        <ul className={styles.socialMediaList}>
          <li>
            <a href="https://facebook.com">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
