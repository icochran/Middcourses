import CourseCard from "./CourseCard"
import DetailedCourseCard from "./DetailedCourseCard"
import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CardGrid({courses}) {

    const [showDetailedView, setShowDetailedView] = useState(true);
    const View = showDetailedView ? DetailedCourseCard : CourseCard;

    const courseList = courses.map(course => (<View key={course.id} course={course} />)) ;

    return(
        <div className={styles.listView} role="grid">
            {courseList.length === 0 ? "No courses match your search criteria." : courseList} 
        </div> 
        );
}

CardGrid.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object)
}