
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import NavBar from "../components/NavBar"
import "bootstrap/dist/css/bootstrap.min.css";
import useCollection from "../hooks/useCollection";

import {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainPage() {

    const [filterBy, setFilterBy] = useState("")
    const [searchBarInput, setSearchBarInput] = useState()
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const average = ((numbers) => {
      if (numbers.length>0) {
        return numbers.reduce(reducer) / numbers.length;
      } else {
        return 0
      }
    })

    const collection = useCollection();

    //I think that I can just put the setRating in here because when 
    //I call it I can just call useCollection at the end which would rerender with the new data??
    //I also dont need to do anything with altered films because it doesnt return it it just counts on the rerender from useCollection
    //now how do I get useCollection to run when 
    const setRating = async (courseid, prof_name, satisfaction, interest, time_commitment, difficulty) => {
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
        `/api/courses/${courseid}`,
        {
          method: "PUT",
          body: JSON.stringify(newRating),
          headers: new Headers({ "Content-type": "application/json" }),
        }
      );
  
      if(!response.ok) {
        throw new Error(response.statusText);
      }
    };
  
    let courses = collection.filter((course) => {
      if (average(course.profs[0].satisfaction) >= 4) {
        return course
      }});


    if (searchBarInput){
      const newInput = searchBarInput.toLowerCase();
      courses = collection.filter((course) => {
        if (course.class_name.toLowerCase().includes(newInput)) {
          return course;
        }
        for (let i = 0; i < course.profs.length; i++) {
          if (course.profs[i].prof_name.toLowerCase().includes(newInput)) {
            return course;
          }
        }});
    }

    const deptSet = new Set();
    collection.forEach((course) => deptSet.add(course.dept));
    const departments = Array.from(deptSet).sort();

    const profSet = new Set();
    collection.forEach((course) => course.profs.forEach((prof) => profSet.add(prof.prof_name.trim())));
    let professors = Array.from(profSet).sort((prof1, prof2) => {
      const prof1Last = prof1.substr(prof1.indexOf("."));
      const prof2Last = prof2.substr(prof2.indexOf("."));
      return prof1Last === prof2Last ? 0 : prof1Last < prof2Last ? -1 : 1;
    });
    if (!professors[0]){
      professors = professors.slice(1);
    }

    if (filterBy){
      courses = collection.filter((course) => {
        if (course.dept===filterBy) {
          return course;
        }
        for (let i = 0; i < course.profs.length; i++) {
          if (course.profs[i].prof_name.includes(filterBy)) {
            return course;
          }
        }
      });
      if (searchBarInput){
        const newInput = searchBarInput.toLowerCase();
        courses = courses.filter((course) => {
          if (course.class_name.toLowerCase().includes(newInput)) {
            return course;
          }
          for (let i = 0; i < course.profs.length; i++) {
            if (course.profs[i].prof_name.toLowerCase().includes(newInput)) {
              return course;
            }
          }
          });
      }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Midd Courses</title>
      </Head>

      <main>
        <h1 className="title">Midd Courses</h1>
        <NavBar 
          setSearchBar = {setSearchBarInput}
          departments={departments} 
          prof={professors}
          setFilterBy={setFilterBy}
        />
        <div className={styles.wrapper}>
          <h2>Filtering by: {filterBy === "" ? "None" : filterBy}</h2>
        </div>
        <div className={styles.wrapper}>
          <div>
            <CardGrid courses={courses} setRating={setRating}/>
          </div>
        </div>
      </main>
    </div>
  );
}
