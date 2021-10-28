export default function CourseCard({course}) {
    const {time} = course.time;
    return(
        <div>
            <h1>Course Name</h1>
            <p>Difficulty</p>
            <p>Interest</p>
            <p>{time}</p>
        </div>        
        );
}