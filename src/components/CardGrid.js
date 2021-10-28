import CourseCard from "../components/CourseCard"

export default function CardGrid({collection}) {

    const dummy_course = {}
    dummy_course.time = "a lot"

    if (collection===null){
        //we didn't get a collection
    }

    return(
        <div>
            <CourseCard course={dummy_course}/> 
            <CourseCard course={dummy_course}/>   
            <CourseCard course={dummy_course}/>  
        </div> 
        );
}