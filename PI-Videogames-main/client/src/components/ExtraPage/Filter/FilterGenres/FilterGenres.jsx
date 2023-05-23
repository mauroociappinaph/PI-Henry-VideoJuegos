import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, getGenres } from "../../../../redux/actions/actions";
import styles from "./FilterGenres.module.css";


const handleOnChange = (e, filters, setFilters, dispatch, setPage) => {
  e.preventDefault();
  const selectedValue = e.target.value;
  if (!filters.includes(selectedValue)) {
    setFilters([selectedValue, ...filters]);
    dispatch(filterByGenres([selectedValue, ...filters]));
    setPage(1);
  }
};

const FilterGenres = ({ setPage }) => {
  const errorFilter = useSelector((state) => state.errorFilter);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleOnClick = (e) => {
    e.preventDefault();
    setFilters([]);
    dispatch(filterByGenres([]));
  };

  return (
    <div className={styles.containerFilterGenres}>
      <label className={styles.filterGenresLabel} htmlFor="genres">
        Genres:
        <br />
        {errorFilter && <span>No videogames</span>}
        <select
          id="genres"
          onChange={(e) => handleOnChange(e, filters, setFilters, dispatch, setPage)}
          className={styles.filterGenresSelect}
        >
          <option className={styles.filterGenresOption}>All </option>
          {genres.map((genre) => (
            <option className={styles.filterGenresOption} value={genre.name} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <span className={styles.filterGenresSpan}>
          <button className={styles.filterGenresButton} onClick={handleOnClick}>
            x
          </button>
        </span>
        <br />
        {filters.length > 0 &&
          filters.map((filter) => (
            <span className={styles.filterGenresSpan} key={filter}>
              · {filter} <br />
            </span>
          ))}
      </label>
    </div>
  );
};

export default FilterGenres;
