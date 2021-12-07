import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export default function RatingBar({ aspect, percentage, numHours}) {

  const barStyle = {
    width: `${percentage}%`,
    background: "#47b5ff",
  }

  const hour_s = numHours===1 ? "hour" : numHours===undefined ? "" : "hours";
  const timeHours = aspect==="Time Commitment" ? <p data-testid="timecommitmentBarNumber" className={styles.timecommitmentBarNumber}>{numHours} {hour_s}</p> : undefined;

  return (
    <>
      <p className={styles.aspectSpacing}>{aspect}</p>
      <div className={styles.BarBackground}>
        <span data-testid="Bar" className={styles.ratingBar} style={barStyle} />
        {timeHours}
      </div>
    </>
  );
}

RatingBar.propTypes = {
  aspect: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};
