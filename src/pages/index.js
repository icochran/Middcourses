
import Head from "next/head"
import styles from "../styles/Home.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import useCollection from "../hooks/useCollection"
import {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginWidget from "../components/LoginWidget.js"
import SecureItem from "../components/SecureItem.js"

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

    let collection = useCollection();

    //in his example he just changes the film data he uses to an altered film set then loads that film set in.
    //however I think in our example it might be better to just call use collection again?
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

      //Can I get this to just use the useCollection rather than actually going through and updating the collection?
      const updated_course = await response.json();

      const updated_collection = collection.map((course) => {
        if(course.id===courseid){
          return updated_course;
        }
        return course
      });

      collection = updated_collection;
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
        <LoginWidget />
        <div className={styles.card}>
          <SecureItem setSearchBarInput ={setSearchBarInput} departments={departments} professors={professors} setFilterBy={setFilterBy} filterBy = {filterBy} courses={courses} setRating={setRating}/> 
        </div>
      </main>
    </div>
  );
}
