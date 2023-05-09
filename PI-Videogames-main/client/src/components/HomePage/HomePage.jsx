import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions/actions";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div>
      <Link to="/videogames"> CREAR VIDEOJUEGO </Link>
      <h1>GAME TITLE</h1>
      <button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        RELOAD VIDEOGAMES
      </button>
      <div>
        <select>
          <option value="asc">ASCENDENTE</option>
          <option value="desc">DESCENDENTE</option>
        </select>
        <select>
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
          <option value="Sports">DEPORTES </option>
          <option value="Fighting">LUCHA</option>
          <option value="Family">FAMILIA</option>
          <option value="Board Games">BOARD GAME</option>
          <option value="Educational">EDUCACIÓN</option>
          <option value="Card">CARTAS</option>
        </select>
        <select>
          <option value="all">TODOS</option>
          <option value="all">CREADOS</option>
          <option value="all">EXISTENTES</option>
        </select>
      </div>
    </div>
  );
}
