import styles from "../styles/Filter.module.css";
import PropTypes from "prop-types";

export default function Filter({setFilterBy, departments}) {

    const depts = departments.map(dept => <li key={dept}><a onClick={() => setFilterBy(dept)}>{dept}</a></li>);
    return(
        <div className={styles.filter}>
            <button className={styles.filterButton}>Department ▾</button>
            <div className={styles.filterContent}>
                <ul>
                <li><a onClick={() => setFilterBy()}>None</a></li>
                {depts}
                </ul>
            </div>
        </div>
    );
}

Filter.propTypes = {
    setFilterBy: PropTypes.func.isRequired
}