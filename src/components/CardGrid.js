import CourseCard from "../components/CourseCard"
import styles from '../styles/Home.module.css';


export default function CardGrid({collection}) {

    const dummy_course = {}
    dummy_course.time = "a lot"

    if (collection===null){
        //we didn't get a collection
    }

    return(
        <div class={styles.listView}>
            <CourseCard course={dummy_course}/> 
            <CourseCard course={dummy_course}/>   
            <CourseCard course={dummy_course}/>  
        </div> 
        );
}