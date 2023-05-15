import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
//!SECTION ALL
export function getVideogames() {
  return async function (dispatch) {
    const json = await axios(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=100`
    );
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data.results,
    });
  };
}
console.log(getVideogames);

//!SECTION SEARCH BAR

export const getNameVideogames = (payload) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/videogames?name=${payload}`);
      const data = json.data;
      return dispatch({ type: "GET_NAME_VIDEOGAMES", payload: data });
    } catch (error) {
      return alert(error.response.data);
    }
  };
};