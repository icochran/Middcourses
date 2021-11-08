import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export default function ProfDropDown({profs}) {
  
  function showOptions() {
    Document.getElementById("myDropdown").classList.toggle("show");
  }

  // courses.forEach((course) => { console.log(course.class_name); });
  const profList = profs.map(prof => (<a href="#" key={prof.prof_name}>{prof.prof_name}</a>)) ;
  return (
    <div className={styles.dropdown}>
      <button onClick={showOptions} classDown={styles.dropbtn}>
        Professors
      </button>
      <div id="myDropdown" classDown={styles.dropdowncontent}>
        {profList}
      </div>
    </div>
  );
}

ProfDropDown.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string),
};
