import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ name, background_image, genre }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img
          className={`${styles.cardImage} ${
            showInfo ? styles["card-image-small"] : ""
          }`}
          src={background_image}
          alt={name}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onTouchStart={() => setShowInfo(true)}
          onTouchEnd={() => setShowInfo(false)}
        />
        {showInfo && (
          <div className={styles.cardInformation}>
            <h2 className={styles.cardH2}>{name}</h2>
            <p className={styles.cardP}>{genre}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
