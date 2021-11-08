import styles from "../styles/Filter.module.css";
import PropTypes from "prop-types";

export default function Filter({setFilterByCategory, setFilterBySub}) {
    return(
        <div className={styles.filter}>
            <button className={styles.filterButton}>Filter ▾</button>
            <div className={styles.filterContent}>
                <ul>
                <li><a onClick={() => setFilterByCategory("")}>None</a></li>
                <li><a>Department</a>
                    <ul>
                    <li><a onClick={() => {
                        setFilterByCategory("Department");
                        setFilterBySub("MATH");}
                        }>MATH</a></li>
                    <li><a onClick={() => {
                        setFilterByCategory("Department");
                        setFilterBySub("CSCI");}}>CSCI</a></li>
                    <li><a onClick={() => {
                        setFilterByCategory("Department");
                        setFilterBySub("ART");}}>ART</a></li>
                    </ul>
                </li>
                </ul>
            </div>
        </div>
    );
}

Filter.propTypes = {
    filterByCallback: PropTypes.func.isRequired
}