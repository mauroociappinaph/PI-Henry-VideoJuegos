import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <img
        src={props.background_image}
        alt={props.name}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className={showInfo ? styles["card-image-small"] : ""}
      />
      {showInfo && (
        <div className={styles["card-info"]}>
          <h2>{props.name}</h2>
          <p>{props.genre}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
