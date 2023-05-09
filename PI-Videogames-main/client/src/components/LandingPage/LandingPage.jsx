import React from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.title}>LET'S PLAY!</h1>
      <Link to="/home">
        <button className={styles.button}>START</button>
      </Link>
      <p className={styles.emoji}>👾Bienvenidos a mi PROYECTO INDIVIDUAL de HENRY👾</p>
    </div>
  );
}
