import {
  GET_ALL_VIDEOGAMES,
  FIND_VIDEOGAME,
  VIDEOGAME_DETAIL,
  GET_GENRES,
  GET_ALL_PLATFORMS,
  FILTER_BY_GENRES,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "./actions-type";
import axios from "axios";
axios.defaults.baseURL="http://localhost:3002"


export const  getAllVideogames = () => {
  return async function (dispatch) {
    const json = await axios.get("/videogames");
    const data = json.data;
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: data,
    });
  };
};




export const findVideogame = (payload) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/videogames?name=${payload}`);
      const data = json.data;
      return dispatch({ type: FIND_VIDEOGAME, payload: data });
    } catch (error) {
      return alert(error.response.data);
    }
  };
};

export const videogameDetail = (id) => {
  return async function (dispatch) {
    const json = await axios.get(`/videogames/${id}`);
    const data = json.data;
    return dispatch({ type: VIDEOGAME_DETAIL, payload: data });
  };
};



export const getGenres = () => {
  return async function (dispatch) {
    const json = await axios.get("/genres");
    const data = json.data;
    return dispatch({ type: GET_GENRES, payload: data });
  };
};

export const postVideogame = (form) => {
  return async function (dispatch) {
    try {
      const data = await axios.post("/videogames", form);
      axios
        .get("/videogames")
        .then((json) => json.data)
        .then((data) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: data }));
      const data_1 = data;
      return alert(data_1.data);
    } catch (error) {
      return alert(error.message);
    }
  };
};

export const getAllPlatforms = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get("/platforms");
      const data = json.data;
      return dispatch({ type: GET_ALL_PLATFORMS, payload: data });
    } catch (error) {
      // Manejo de errores
      console.error("Error retrieving platforms:", error);
    }
  };
};


export const filterByGenres = (filter) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_GENRES, payload: filter });
  };
};

export const filterByOrigin = (filter) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_ORIGIN, payload: filter });
  };
};

export const orderByName = (order) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_NAME, payload: order });
  };
};

export const orderByRating = (order) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_RATING, payload: order });
  };
};


