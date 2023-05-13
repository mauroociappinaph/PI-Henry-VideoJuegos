import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={styles.paginado}>
      <nav className={styles.paginadoNav}>
        <ul className={styles.paginadoUl}>
          {pageNumbers &&
            pageNumbers.map(number => (
              <li className={styles.paginadoLi} key={number}>
                <a
                  onClick={() => paginado(number)}
                  className={currentPage === number ? styles.active : ""}
                >
                  {number}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
