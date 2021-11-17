//import CourseCard from "../components/CourseCard"
import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import Container from "../components/Container";

export default function CardGrid({courses}) {

    // courses.forEach((course) => { console.log(course.class_name); });
     const courseList = courses.map(course => (<Container key={course.id} course={course}/>)) ;
    //const courseList = courses.map(course => {reviewing ? (<CourseCard key={course.id} course={course}/>) : (<Review key={course.id} course={course}/>)}) ;

    return(
        <div className={styles.listView}>
            {courseList.length === 0 ? "No courses match your search criteria." : courseList} 
        </div> 
        );
}

CardGrid.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object)
}