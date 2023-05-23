import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getGenres,
  postVideogame,
  getAllPlatforms,
} from "../../../redux/actions/actions";

import styles from "./FormPage.module.css";
import NavBar from "../../ExtraPage/NavBar/NavBar";

const FormPage = () => {
  const history = useHistory();
  const genresList = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    plataforms: "",
    released: "",
    rating: 0,
    genres: [],
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    description: "",
    plataforms: "",
    released: "",
    rating: 0,
    genres: [],
  });
  const formLoading = useSelector((state) => state.formLoading);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  //NOTE - Hanndleres
  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerGenres = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      genres: [...form.genres, e.target.value],
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(postVideogame(form));
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
    <>
      <NavBar />
      <div className={styles.formContainer}></div>
      <div className={styles.page}>
        {formLoading ? (
          <div className={styles.loader}>
            <div className={styles.progressBar}></div>
          </div>
        ) : (
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <div>
              <label className={form.label}>NAME:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.name}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>
            <div>
              <label className={form.label}>IMAGE</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.image}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>
            <div>
              <label className={form.label}>DESCRIPTION:</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.description}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>
            <div>
              <label className={form.label}>PLATAFORMS:</label>
              <input
                type="text"
                name="plataforms"
                value={form.plataforms}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.plataforms}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>
            <div>
              <label className={form.label}>RELEASED:</label>
              <input
                type="text"
                name="released"
                value={form.released}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.released}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>
            <div>
              <label className={form.label}>RATING:</label>
              <input
                type="text"
                name="rating"
                value={form.rating}
                onChange={(e) => handlerChange(e)}
              />
              {error && <span className="error">{error.rating}</span>}
              <span className={error ? "error" : ""}>*</span>
            </div>

            <input type="submit" value="Crear"  onClick={(e) => handleOnSubmit(e)}/>
            <select onChange={(e) => handlerGenres(e)}>
              <option>ALL GENRES</option>
              {genresList.map((genres) => (
                <option key={genres.id} value={genres.name}>
                  {genres.name}
                </option>
              ))}
            </select>
          </form>
        )}
      </div>
    </>
  );
};

export default FormPage;
