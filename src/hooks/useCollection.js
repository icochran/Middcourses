import { useState, useEffect } from "react";

export default function useCollection() {
  const [data, setData] = useState([]);

  useEffect(() => {
      const getData = async () => {
        const response = await fetch(
          "/api/courses"
        );
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        const courses = await response.json();
    
        setData(courses);
      };
    
      getData();
    }, []);

  /*const setRating = async (courseid, prof_name, satisfaction, interest, time_commitment, difficulty) => {
    const newRating = {
      course_id: courseid, 
      prof_name: prof_name, 
      satisfaction: satisfaction, 
      interest: interest, 
      time_commitment: time_commitment, 
      difficulty: difficulty
    }

    //Prof anddrews passes the whole updated course object through but I think that I only need to pass the specific rating
    const response = await fetch(
      `/api/films/${courseid}`,
      {
        method: "PUT",
        body: JSON.stringify(newRating),
        headers: new Headers({ "Content-type": "application/json" }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    //that makes it tricky down here because I can't base the updated film off of what I get but rather what I think it should be
    //const updatedRating = await response.json();

    const alteredCourses = data.map((course) => {
      if (course.course_id === courseid) {
        for(let i=0; i<course.profs.length; i++){
          if(course.profs[i].prof_name===prof_name){
            course.profs[i].satisfaction.push(satisfaction);
            course.profs[i].satisfaction.push(interest);
            course.profs[i].satisfaction.push(time_commitment);
            course.profs[i].satisfaction.push(difficulty);
            break;
          }
        }
        return course;
      }
      return course;
    });
    setData(alteredCourses);
  };*/

    return data;
}