import CourseCard from "../components/CourseCard"

export default function CardGrid({collection}) {
    return(
        <div>
            <CourseCard/> 
            <CourseCard/>   
            <CourseCard/>  
        </div> 
        );
}