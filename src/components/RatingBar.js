import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export default function RatingBar({aspect, percentage}) {

  const barStyle = {
    width: `${percentage}%`,
    background: "#47b5ff",
  }

  return (
    <>
      <p className={styles.aspectSpacing}>{aspect}</p>
      <div className={styles.BarBackground}>
        <span data-testid="Bar" className={styles.ratingBar} style={barStyle} />
      </div>
    </>
  );
}

RatingBar.propTypes = {
  aspect: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired
};
