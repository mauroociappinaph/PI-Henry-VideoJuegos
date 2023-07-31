import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getGenres,
  postVideogame,
  getAllPlatforms,
} from "../../../redux/actions/actions";

import styles from "./FormPage.module.css";
import Header from "../../ExtraPage/Header/Header";
import Footer from "../../ExtraPage/Footer/Footer";

const FormPage = () => {
  const history = useHistory();
  const genresList = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  });
  const formLoading = useSelector((state) => state.formLoading);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(validateForm({ ...form, [name]: value }));
  };

  //! Define una función que maneja los cambios en el arreglo de géneros en el formulario
  const handleGenres = (e) => {
    // Previene el comportamiento por defecto del evento
    e.preventDefault();
    // Actualiza el estado del formulario creando un nuevo objeto con todas las propiedades del estado actual del formulario, excepto por el arreglo de géneros que se reemplaza con un nuevo arreglo que contiene todos los géneros existentes más el nuevo género del evento.
    setForm({
      ...form,
      genres: [...form.genres, e.target.value],
    });
  };

  
 // ! Maneja la presentación del formulario  enviando una acción post.
const handleSubmit = (e) => {
  e.preventDefault(); 
  dispatch(postVideogame(form)); 
  history.push("/home"); 
};

//! Validaciones del Formulario
const validateForm = () => {
    const { name, background_image, description, rating } = form;
    const errors = {};

    if (!name) {
      errors.name = "El nombre no puede estar vació";
    } else if (name.length >= 15) {
      errors.name = "No puede tener mas de 15 caracteres";
    } else if (name !== name.toLowerCase()) {
      errors.name = "Cannot have capital letters";
    }

    if (background_image && !/.(gif|jpeg|jpg|png)$/i.test(background_image)) {
      errors.background_image = "It has to be an Image Link";
    }

    if (description && description.length >= 15) {
      errors.description = "No puede tener mas de 15 caracteres";
    }

    if (rating) {
      const num = parseInt(rating, 10);
      if (isNaN(num) || num <= 0) {
        errors.rating = "Only positive numbers";
      }
    }

    if (form.genres.length === 0) {
      errors.genres = "You must select at least one genre";
    }

    if (!form.platforms) {
      errors.platforms = "You must select at least one platform";
    }
    return errors;
  };

  return (
    <div className={styles.containerForm}>
      <Header />
      <div className={styles.formContainer}>
        <div className={styles.page}>
          {formLoading ? (
            <div className={styles.loader}>
              <div className={styles.progressBar}></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>NAME:</label>
                </div>

                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && <span className={styles.error}>{error.name}</span>}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>IMAGE:</label>
                </div>
                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="background_image"
                    value={form.background_image}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && <span className={styles.error}>{error.image}</span>}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>DESCRIPTION:</label>
                </div>
                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && (
                    <span className={styles.error}>{error.description}</span>
                  )}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>PLATFORMS:</label>
                </div>
                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="platforms"
                    value={form.platforms}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && (
                    <span className={styles.error}>{error.platforms}</span>
                  )}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>RELEASED:</label>
                </div>
                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="released"
                    value={form.released}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && (
                    <span className={styles.error}>{error.released}</span>
                  )}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <label className={styles.label}>RATING:</label>
                </div>
                <div className={styles.gridItem}>
                  <input
                    type="text"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  {error && (
                    <span className={styles.error}>{error.rating}</span>
                  )}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <div className={styles.containerSelect}>
                <select className={styles.select} onChange={handleGenres}>
                  <option className={styles.optionAllGenres}>ALL GENRES</option>
                  {genresList.map((genres) => (
                    <option key={genres.id} value={genres.name}>
                      {genres.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.containerInput}>
                <input
                  className={styles.input}
                  type="submit"
                  value="Crear"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default FormPage;
