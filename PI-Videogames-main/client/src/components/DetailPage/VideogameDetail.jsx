import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(videogameDetail(params.id));
  }, [dispatch, params.id]);

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
                        <span>Genres: </span>
                        <br />
                        <div>
                          {detail.genres.map((genre) => (
                            <div key={genre.name ?? genre}>
                              · {genre.name ?? genre}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.list}>
                        <span>Platforms: </span>
                        <br />
                        <div className={styles.genres_platforms}>
                          {detail.platforms.map((platform) => (
                            <div key={platform}>· {platform} </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      Rating: {detail.rating}
                      <br />
                      Released: {detail.released}
                    </div>
                    <div className={styles.description}>
                      <span>Description: </span>
                      <br />
                      <br />
                      <span>
                        {decodeURI(detail.description)
                          .split("<p>")
                          .join(" ")
                          .split("</p>")
                          .join("")
                          .split("<br />")
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={detail.background_image}
                      alt="error"
                      className={styles.img}
                    />
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
