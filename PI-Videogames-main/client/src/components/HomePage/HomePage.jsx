import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "../ExtraPage/Card/Card";
import Paginado from "../ExtraPage/Paginado/Paginado";
import SearchBar from "../ExtraPage/SearchBar/SearchBar";
import styles from "./HomePage.module.css";

//TODO  - Function HomePage
export default function HomePage() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  //SECTION - BARRA DE BÚSQUEDA

  console.log("Cantidad de elementos: ", allVideogames.length); // Agregar esta línea

  //SECTION - Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogames = currentPage * videogamesPerPage;
  const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogames,
    indexOfLastVideogames
  );

  // Para comprobar que la longitud es correcta:
  console.log(currentVideogames.length);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]); //REVIEW - useEffect sobra el videogames

  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div className={styles.container}>
      <Link to="/videogames" className={styles.link}>
        CREAR VIDEOJUEGO
      </Link>
      <h1 className={styles.title}>GAME TITLE</h1>
      <button
        className={styles.button}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        RELOAD VIDEOGAMES
      </button>
      <div className={styles.selectContainer}>
        <div className={styles.fila}>
          <select className={styles.select}>
            <option value="asc">ASCENDENTE</option>
            <option value="desc">DESCENDENTE</option>
          </select>
          <select className={styles.select}>
            <option value="All">TODOS</option>
            <option value="Action">ACCIÓN</option>
            <option value="Indie">INDIE</option>
            <option value="Adventure">AVENTURA</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">ESTRATEGIA</option>
            <option value="Shooter">SHOOTER</option>
            <option value="Casual">CASUAL</option>
            <option value="Simulation">SIMULACIÓN</option>
            <option value="Puzzle">PUZZLE</option>
            <option value="Arcade">ARCADE</option>
            <option value="Platformer">PLATAFORMA</option>
            <option value="Massively Multip">MASSIVELY MULTIP</option>
            <option value="Racing">RACING</option>
            <option value="Sports">DEPORTES</option>
            <option value="Fighting">LUCHA</option>
            <option value="Family">FAMILIA</option>
            <option value="Board Games">BOARD GAME</option>
            <option value="Educational">EDUCACIÓN</option>
            <option value="Card">CARTAS</option>
          </select>
          <select className={styles.select}>
            <option value="all">TODOS</option>
            <option value="created">CREADOS</option>
            <option value="existing">EXISTENTES</option>
          </select>
          <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
          />
          <SearchBar />
        </div>
        <div className={styles.prueba}>
          {Object.keys(currentVideogames).length ? (
            currentVideogames.map((videogames) => {
              return (
                <Card
                  key={videogames.id}
                  id={videogames.id}
                  name={videogames.name}
                  genres={videogames.genres}
                  background_image={videogames.background_image}
                />
              );
            })
          ) : (
            <div>
              <h1>Cargando</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
