import styles from "../styles/Filter.module.css";
import PropTypes from "prop-types";

export default function Filter({setFilterBy}) {
    return(
        <div className={styles.filter}>
            <button className={styles.filterButton}>Filter ▾</button>
            <div className={styles.filterContent}>
                <ul>
                <li><a onClick={() => setFilterBy()}>None</a></li>
                <li><a>Department</a>
                    <ul>
                    <li><a onClick={() => {
                        setFilterBy("MATH");}}>MATH</a></li>
                    <li><a onClick={() => {
                        setFilterBy("CSCI");}}>CSCI</a></li>
                    <li><a onClick={() => {
                        setFilterBy("ART");}}>ART</a></li>
                    </ul>
                </li>
                </ul>
            </div>
        </div>
    );
}

Filter.propTypes = {
    setFilterBy: PropTypes.func.isRequired
}