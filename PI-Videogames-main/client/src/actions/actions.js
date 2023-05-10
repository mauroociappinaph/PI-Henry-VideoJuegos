import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export function getVideogames() {
  return async function(dispatch) {
    var json = await axios(`https://api.rawg.io/api/games?key=${apiKey}&page_size=100`);
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: json.data.results
    });
  };
}
console.log(getVideogames);