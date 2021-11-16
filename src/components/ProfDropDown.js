
import styles from "../styles/dropdown.module.css";
import PropTypes from "prop-types";

export default function ProfDropDown({profs, setProfName}) {
  
  const profList = profs.map(prof => (<li key={prof.prof_name}><a onClick={()=>setProfName(prof.prof_name)}>{prof.prof_name}</a></li>)) ;
  
  if(profs.length>1){
    return (
      <div className={styles.filter}>
        <button className={styles.filterButton}>Professors ▾</button>
              <div className={styles.filterContent}>
                  <ul>
                  <li key={"Aggregate"}><a onClick={()=>setProfName("Aggregate")}>{"Aggregate"}</a></li>
                  {profList}
                  </ul>
              </div>
      </div>
    );
  } else{
    return(
      <div className={styles.filter}>
        <button className={styles.filterButton}>{profs[0].prof_name}</button>
      </div>
    )
  }
  
}

ProfDropDown.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string),
};
