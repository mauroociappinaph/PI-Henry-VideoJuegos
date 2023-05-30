import React from "react";
import styles from "./Header.module.css";
import NavBar from "../NavBar/NavBar";

// agregar un paginado para la lista de juegos

const Header = () => {
  return (
    <Header className={styles.header}>
      <h1 className={styles.title}>Videojuegos App</h1>

      <NavBar />
    </Header>
  );
};

export default Header;
