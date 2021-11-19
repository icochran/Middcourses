import CourseCard from "./CourseCard"
import DetailedCourseCard from "./DetailedCourseCard"
import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CardGrid({courses}) {

    const [showDetailedView, setShowDetailedView] = useState(false);
    const View = showDetailedView ? CourseCard : DetailedCourseCard;

    const courseList = courses.map(course => (<View key={course.id} course={course} setShowDetailedView={setShowDetailedView}/>)) ;

    return(
        <div className={styles.listView} role="grid">
            <View {...courses} onClick={() => { 
                setShowDetailedView(!showDetailedView)}}/>
            {courseList.length === 0 ? "No courses match your search criteria." : courseList} 
        </div> 
        );
}

CardGrid.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object)
}