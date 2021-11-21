import styles from "../styles/Filter.module.css";
import PropTypes from "prop-types";

export default function Filter({setFilterBy, departments, prof}) {

    const depts = departments.map(dept => <li data-testid = "dept" key={dept}><a onClick={() => setFilterBy(dept)}>{dept}</a></li>);
    const profs = prof.map(professor => <li data-testid = "prof" key={professor}><a onClick={() => setFilterBy(professor)}>{professor}</a></li>);
    return(
        <div className={styles.wrapper}>
            <div className={styles.dept}>
                <h1 className={styles.filterButtonDept}>Department ▾</h1>
                <div className={styles.filterContent}>
                    <ul>
                    <li data-testid = "dept" key={"NoneD"}><a onClick={() => setFilterBy()}>None</a></li>
                    {depts}
                    </ul>
                </div>
            </div>
            <div className={styles.prof}>
                <h1 className={styles.filterButtonProf}>Professor ▾</h1>
                <div className={styles.filterContent}>
                    <ul>
                    <li data-testid = "prof" key={"NoneP"}><a onClick={() => setFilterBy()}>None</a></li>
                    {profs}
                    </ul>
                </div>
            </div>
        </div>
        
        
    );
}

Filter.propTypes = {
    setFilterBy: PropTypes.func.isRequired
}

/*
<div className={styles.right}>
                <h1 className={styles.filterButton}>Professor ▾</h1>
                <div className={styles.filterContent}>
                    <ul>
                    <li><a onClick={() => setFilterBy()}>None</a></li>
                    {profs}
                    </ul>
                </div>
            </div>
*/