import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";

export default function RatingBar({ aspect, barStyle, numHours}) {

  const timeHours = aspect==="Time Commitment" ? <p data-testid="timecommitmentBarNumber" className={styles.timecommitmentBarNumber}>{numHours} hours</p> : undefined;

  return (
    <>
      <p>{aspect}</p>
      <div className={styles.BarBackground}>
        <span data-testid="Bar" className={styles.ratingBar} style={barStyle} />
        {timeHours}
      </div>
    </>
  );
}

RatingBar.propTypes = {
  aspect: PropTypes.string.isRequired,
  barStyle: PropTypes.object.isRequired,
};
