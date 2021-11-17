
import styles from "../styles/dropdown.module.css";
import PropTypes from "prop-types";

export default function ProfDropDown({profs, setProfName}) {
  const profSet = new Set();
  const sortedProfs = []
   
  for (let i = 0; i < profs.length; i++) {
    sortedProfs[i] = (profs[i].prof_name);
  }
  sortedProfs.sort();
  sortedProfs.forEach((e) => {
  if (!(profSet.has(e))) {
    profSet.add(e)
  }});
  const professors = Array.from(profSet);

  const profList = professors.map(prof => (<li key={prof}><a onClick={()=>setProfName(prof)}>{prof}</a></li>)) ;
  
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
