import CourseCard from "../components/CourseCard"
import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export default function CardGrid({courses}) {

    const courseList = courses.map(course => (<CourseCard key={course.class_name} course={course}/>)) ;

    if (courses===null){
        //we didn't get a collection
    }

    return(
        <div className={styles.listView}>
            {courseList} 
        </div> 
        );
}

CardGrid.propTypes = {
    collection: PropTypes.arrayOf(PropTypes.object)
}