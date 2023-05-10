import React from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>LET'S PLAY!</h1>
      <p className={styles.emoji}>
        👾 Bienvenidos a mi PROYECTO INDIVIDUAL de HENRY 👾
      </p>
      <Link to="/home">
        <button className={styles.btnStart}>Empezar</button>
      </Link>
    </div>
  );
}
