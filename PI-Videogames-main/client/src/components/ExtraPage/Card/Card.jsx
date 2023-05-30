import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ id, name, background_image, genres , rating }) => {
  const [showInfo, setShowInfo] = useState(false);
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/detail/${id}`);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img
          className={`${styles.cardImage} ${
            showInfo ? styles["card-image-small"] : ""
          }`}
          src={background_image}
          alt={name}
          onClick={handleCardClick}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onTouchStart={() => setShowInfo(true)}
          onTouchEnd={() => setShowInfo(false)}
        />
         {showInfo && (
          <div className={styles.cardInformation}>
            <h2 className={styles.cardH2}>{name}</h2>
            <p className={styles.cardP}>{genres}</p>
            <p className={styles.cardP}>{rating}</p>
          </div>
        )}
      </div>
      <div className={styles.cardInformation}>
            <h2 className={styles.cardH2}>{name}</h2>
            <h4 className={styles.cardH4}>{genres}</h4>
            <h4 className={styles.cardH4}>{rating}</h4>

          </div>
    </div>
  );
};

export default Card;
