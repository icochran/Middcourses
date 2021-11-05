import CourseCard from "../components/CourseCard"
import styles from "../styles/Home.module.css";

export default function CardGrid({collection}) {

    const courseList = collection.map(course => (<CourseCard course={course}/>)) ;

    if (collection===null){
        //we didn't get a collection
    }

    return(
        <div className={styles.listView}>
            {courseList} 
        </div> 
        );
}