import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>Este es el contenido del footer</p>
      </div>
    </footer>
  );
};

export default Footer;
