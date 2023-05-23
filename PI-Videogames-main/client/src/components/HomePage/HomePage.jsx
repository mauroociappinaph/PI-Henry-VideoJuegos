import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../ExtraPage/Card/Card";
import Header from "../ExtraPage/Header/Header";
import FilterGenres from "../ExtraPage/Filter/FilterGenres/FilterGenres";
import FilterOrigin from "../ExtraPage/Filter/FilterOrigin/FilterOrigin";

import {
  findVideogame,
  getAllVideogames,
  orderByName,
  orderByRating,
} from "../../redux/actions/actions.js";

import styles from "./HomePage.module.css";
import Footer from "../ExtraPage/Footer/Footer";

const HomePage = () => {
  const videogamesAux = useSelector((state) => state.videogamesAux);
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState("");
  const [orderRating, setOrderRating] = useState("");
  const [page, setPage] = useState(1);
  const videogamesPerPage = 15;
  const firstIndex = (page - 1) * videogamesPerPage;
  const lastIndex = page * videogamesPerPage;
  const pageVideogames = videogamesAux.slice(firstIndex, lastIndex);
  const pagesNumber = Math.ceil(videogamesAux.length / videogamesPerPage);
  const pages = [...Array(pagesNumber).keys()].map((i) => i + 1);
  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getAllVideogames());
    }
  }, [dispatch, videogames]);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getAllVideogames()).catch((error) => {
        setError("Error en cargar videogames. Por favor intentar nuevamente.");
      });
    }
  }, [dispatch, videogames]);

  
  const handlePageChange = (newPage, paging) => {
    if (newPage) {
      setPage(newPage);
    } else if (page !== pagesNumber && paging === "+") {
      setPage(page + 1);
    } else if (page !== 1 && paging === "-") {
      setPage(page - 1);
    }
  };

  const handleOrderName = (e) => {
    setOrderName(e.target.id);
    dispatch(orderByName(e.target.id));
  };

  const handleOrderRating = (e) => {
    setOrderRating(e.target.id);
    dispatch(orderByRating(e.target.id));
  };

  const handleOnSearch = (e) => {
    dispatch(findVideogame(e.target.value));
    setPage(1);
  };
  //-----------------------------------------------------------------
  return (
    <div>

      <Header />
    <div className={styles.home}>
      {error && <div className={styles.homeDivError}>Error: {error}</div>}
      <div>
        
      </div>
      <div className={styles.nav}>
        <nav className={styles.lateral}>
          <label className={styles.search} htmlFor="search">
            BUSCAR VIDEOGAMES
            <input
              id="search"
              type="search"
              placeholder="NOMBRE"
              onChange={(e) => handleOnSearch(e)}
              className="bars"
            />
          </label>

          <div className={styles.filters}>
            <div className={styles.titles}>Filters</div>
            <FilterGenres setPage={setPage} />
            <FilterOrigin setPage={setPage} />
          </div>
          <div className={styles.items}>
            <div className={styles.titles}>ORDENAR</div>
            <span>NOMBRE</span>
            <div className={styles.order}>
              <label htmlFor="asc" className={styles.input}>
                <input
                  type="radio"
                  name="orderName"
                  id="asc"
                  checked={orderName === "asc"}
                  onChange={(e) => handleOrderName(e)}
                />
                A - Z
              </label>
              <label htmlFor="des" className={styles.input}>
                <input
                  type="radio"
                  name="orderName"
                  id="des"
                  checked={orderName === "des"}
                  onChange={(e) => handleOrderName(e)}
                />
                Z - A
              </label>
            </div>
            <span>RATING</span>
            <div className={styles.order}>
              <label htmlFor="up">
                <input
                  type="radio"
                  id="up"
                  name="orderRating"
                  checked={orderRating === "up"}
                  onChange={(e) => handleOrderRating(e)}
                />
                ASCENDENTE
              </label>
              <label htmlFor="down">
                <input
                  type="radio"
                  id="down"
                  name="orderRating"
                  checked={orderRating === "down"}
                  onChange={(e) => handleOrderRating(e)}
                />
                DECENDENTE
              </label>
            </div>
          </div>
        </nav>
        <div className={styles.number}>
          {videogamesAux.length > 0 && (
            <div className={styles.paging}>
              {pages.length > 1 && (
                <button
                  id="-"
                  onClick={(e) => handlePageChange(null, e.target.id)}
                  className={styles.font}
                >
                  PREV
                </button>
              )}
              {pages.map((newPage) => (
                <button
                  key={newPage}
                  onClick={() => handlePageChange(newPage)}
                  className={styles.font}
                >
                  {newPage}
                </button>
              ))}
              {pages.length > 1 && (
                <button
                  id="+"
                  onClick={(e) => handlePageChange(null, e.target.id)}
                  className={styles.font}
                >
                  NEXT
                </button>
              )}
            </div>
          )}
        </div>
        {pageVideogames && (
          <div>
            <div className={styles.pageNumberTop}>page: {page}</div>
            <div className={styles.container}>
              {pageVideogames.map((game) => (
                <Card
                  id={game.id}
                  key={game.id}
                  name={game.name}
                  background_image={game.background_image}
                  genres={game.genres}
                />
              ))}
            </div>
          </div>
        )}
        {videogames.length === 0 && (
          <div className={styles.all}>
            <div className={styles.loader}>
              <div className={styles.bar1}></div>
              <div className={styles.bar2}></div>
              <div className={styles.bar3}></div>
              <div className={styles.bar4}></div>
              <div className={styles.bar5}></div>
              <div className={styles.bar6}></div>
              <div className={styles.bar7}></div>
              <div className={styles.bar8}></div>
              <div className={styles.bar9}></div>
              <div className={styles.bar10}></div>
              <div className={styles.bar11}></div>
              <div className={styles.bar12}></div>
            </div>
          </div>
        )}
        {videogames.length > 0 && pageVideogames.length === 0 && (
          <div className={styles.all}>
            {/* <div className={styles.loader}> */}
            <div className={styles.btnImgContainer}>
              <button
                className={styles.btnNotFound}
                onClick={() => window.location.reload()}
              >
                {" "}
                RECARGAR{" "}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};
//---------------------------------------------------------------------
export default HomePage;
