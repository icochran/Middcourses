import CourseCard from "../components/CourseCard"
import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";

export default function CardGrid({collection}) {

    const courseList = collection.map(course => (<CourseCard key={course.id} course={course}/>)) ;

    if (collection===null){
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