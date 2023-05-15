import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css";
import { getNameVideogames } from "../../../redux/actions/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

function handleInputChange (event){
event.preventDefault()
setName(event.target.value)
console.log(name);
}

function handleSubmit (event) {
    event.preventDefault()
    dispatch(getNameVideogames(name))
}


  return (
    <div>
      <input type="text" placeholder="BUSCAR VIDEOGAMES" onChange={(event) => handleInputChange(event)}/>
      <button type="submit" onClick={(event) => handleSubmit(event)} >BUSCAR VIDEOGAMES</button>
    </div>
  );
}
