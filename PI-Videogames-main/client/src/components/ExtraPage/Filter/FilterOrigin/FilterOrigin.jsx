import React from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin } from "../../../../redux/actions/actions";
import styles from "./FilterOrigin.module.css";

const FilterOrigin = ({ setPage }) => {
  const dispatch = useDispatch();

  const handleOnSelect = (e) => {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
    setPage(1);
  };

  return (
    <div className={styles.containerFilterOrigin}>
      <label htmlFor="origin" className={styles.filterOriginLabel}>
        <h5 className={styles.filterGenresH5}>
        Origin:
        </h5>
      </label>
      <select
        id="origin"
        onChange={(e) => handleOnSelect(e)}
        className={styles.filterOriginSelect}
      >
        <option  value="All">All</option>
        <option  value="false">Api</option>
        <option  value="true">Database</option>
      </select>
    </div>
  );
};

export default FilterOrigin;
