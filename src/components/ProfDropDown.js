
import styles from "../styles/dropdown.module.css";
import PropTypes from "prop-types";

export default function ProfDropDown({profs, setProf}) {
  
  const profSetter =(pname)=>{
    const newProf = profs.find(a => a.prof_name === pname)
    setProf(newProf)
    
    // if(pname!=="Aggregate"){
      
    // }else{
    //   setProf(pname)
    // }
    
  }
  const profList = profs.map(prof => (<li key={prof.prof_name}><a onClick={profSetter(prof.prof_name)}>{prof.prof_name}</a></li>)) ;
  
  if(profs.length>1){
    return (
      <div className={styles.filter}>
        <button className={styles.filterButton}>Professors ▾</button>
              <div className={styles.filterContent}>
                  <ul>
                  <li key={"Aggregate"}><a onClick={profSetter("Aggregate")}>{"Aggregate"}</a></li>
                  {profList}
                  </ul>
              </div>
      </div>
    );
  } else{
    return(
      <div className={styles.filter}>
        <button className={styles.filterButton}>Professors ▾</button>
              <div className={styles.filterContent}>
                  <ul>
                  {profList}
                  </ul>
              </div>
      </div>
    )
  }
  
}

ProfDropDown.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string),
};
