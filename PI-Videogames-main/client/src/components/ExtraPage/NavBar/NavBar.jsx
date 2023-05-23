import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <>
      <nav className={styles.containerNav}>
        <div className={styles.containerButton}>
          <button className={styles.button}>
            <NavLink to="/" className={styles.link}>
              <div className={styles.linkH2}> INICIO</div>
            </NavLink>
          </button>
          <button className={styles.button}>
            <NavLink to="/home" className={styles.link}>
              <div className={styles.linkH2}> HOME </div>
            </NavLink>
          </button>
          <button className={styles.button}>
            <NavLink to="/create" className={styles.link}>
              <div className={styles.linkH2}> CREATE VIDEOGAME </div>
            </NavLink>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
