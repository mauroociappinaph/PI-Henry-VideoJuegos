import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions/actions";
import { Link } from "react-router-dom";
import Card from "../ExtraPage/Card/Card";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch ]);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }
  console.log("allVideogames:", allVideogames);
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
      <div>
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
        <div className={styles.prueba}>
          
          
       {allVideogames && allVideogames.map((c) => {

  console.log('Name:', c.name);
  console.log('Image:', c.background_image);
  console.log('Genres:', c.genres);
  return (
    <div key={c.id} className={styles.cardContainer}>
      <Link to={"/home/" + c.id}>
        <Card
          name={c.name}
          genres={c.genres}
          background_image={c.background_image}
        />
      </Link>
    </div>
  );
})}


          
        </div>
      </div>
    </div>
  );
}
