import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videogameDetail } from "../../redux/actions/actions.js";
import Header from "../ExtraPage/Header/Header.jsx";
import styles from "./VideogameDetail.module.css";
import Footer from "../ExtraPage/Footer/Footer.jsx";

const VideogameDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const detail = useSelector((state) => state.detail);
  const detailLoading = useSelector((state) => state.detailLoading);
  const [showGenres, setShowGenres] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);

  useEffect(() => {
    dispatch(videogameDetail(params.id));
  }, [dispatch, params.id]);

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };

  const togglePlatforms = () => {
    setShowPlatforms(!showPlatforms);
  };

  useEffect(() => {
    setShowGenres(false);
    setShowPlatforms(false);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Header className={styles.header} />
        {detailLoading ? (
          <div className={styles.loader}>
            <div className={styles.progressBar}></div>
          </div>
        ) : (
          <>
            {Object.keys(detail).length ? (
              <div className={styles.card}>
                <div className={styles.game}>
                  <div className={styles.detail}>
                    <span className={styles.name}>
                      {detail.name.toUpperCase()}
                    </span>
                    <div className={styles.items}>
                      <div className={styles.list}>
                        <h2 className={styles.listH2} onClick={toggleGenres}>
                          GENRES
                          <span
                            className={`${styles["list-toggle"]} ${
                              showGenres ? "active" : ""
                            }`}
                          >
                            {showGenres ? "▲" : "▼"}
                          </span>
                        </h2>
                        <br />
                        <div
                          className={`${
                            showGenres ? styles["genres-list"] : ""
                          }`}
                        >
                          {detail.genres.map((genre) => (
                            <div key={genre.name ?? genre}>
                              · {genre.name ?? genre}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.list}>
                        <h2 className={styles.listH2} onClick={togglePlatforms}>
                          PLATAFORMA
                          <span
                            className={`${styles["list-toggle"]} ${
                              showPlatforms ? "active" : ""
                            }`}
                          >
                            {showPlatforms ? "▲" : "▼"}
                          </span>
                        </h2>
                        <br />
                        <div
                          className={`${
                            showPlatforms ? styles["platforms-list"] : ""
                          }`}
                        >
                          {detail.platforms.map((platform) => (
                            <div key={platform}>{platform} </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={styles.containerDescription}>
                      <div className={styles.description}>
                        <h2 className={styles.descriptionH2}>Description</h2>
                        <span className={styles.descriptionSpan}>
                          {decodeURI(detail.description)
                            .split("<p>")
                            .join(" ")
                            .split("</p>")
                            .join("")
                            .split("<br />")
                            .join("")}
                        </span>
                      </div>
                  <div>
                    <img
                      src={detail.background_image}
                      alt="error"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.contenedorRatingReleased}>
                    <div className={styles.contenedorRating}>
                      <h4 className={styles.h4}>Rating: {detail.rating}</h4>
                    </div>
                    <div className={styles.contenedorReleased}>
                      <h4 className={styles.h4}>Released: {detail.released}</h4>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default VideogameDetail;
