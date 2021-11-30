import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import Container from "../components/Container";

export default function CardGrid({courses}) {

     const courseList = courses.map(course => (<Container key={course.id} course={course}/>)) ;

    return(
        <div className={styles.listView} role="grid">
            {courseList.length === 0 ? "No courses match your search criteria." : courseList} 
        </div> 
        );
}

CardGrid.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object)
}