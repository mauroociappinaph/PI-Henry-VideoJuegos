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
    image: "",
    description: "",
    platforms: "",
    released: "",
    rating: 0,
    genres: [],
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    description: "",
    platforms: "",
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
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleGenres = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      genres: [...form.genres, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(postVideogame(form));
      setForm({
        name: "",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: 0,
        genres: [],
      });
      history.push("/home");
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!form.name || form.name.trim() === "") {
      valid = false;
      errors.name = "El nombre es requerido";
    }

    if (!form.image || form.image.trim() === "") {
      valid = false;
      errors.image = "La imagen es requerida";
    }

    if (!form.released || form.released.trim() === "") {
      valid = false;
      errors.released = "La fecha de lanzamiento es requerida";
    }

    if (form.rating < 1 || form.rating > 5) {
      valid = false;
      errors.rating = "El rating debe estar entre 1 y 5";
    }

    setError(errors);
    return valid;
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
                    name="image"
                    value={form.image}
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
                  {error && <span className={styles.error}>{error.released}</span>}
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
                  {error && <span className={styles.error}>{error.rating}</span>}
                  <span className={error ? styles.error : ""}>*</span>
                </div>
              </div>
              <select onChange={handleGenres}>
                <option className={styles.optionAllGenres}>ALL GENRES</option>
                {genresList.map((genres) => (
                  <option key={genres.id} value={genres.name}>
                    {genres.name}
                  </option>
                ))}
              </select>
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


