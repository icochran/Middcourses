
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
//import data from "../../data/test-data.json"
import useCollection from "../hooks/useCollection";

import {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainPage() {

    const [filterBy, setFilterBy] = useState("")
    const [searchBarInput, setSearchBarInput] = useState()
    //const [collection, setCollection] = useState(data) 
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const average = ((numbers) => {
      return numbers.reduce(reducer) / numbers.length;
    })

    const collection = useCollection();

    // maybe want to useEffect here?

    /*useEffect(() => {
      if (currentArticle) {
        selectCurrentSection(currentArticle.title.charAt(0));
        select(currentArticle);
      }
    }, [currentArticle]);  */


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

    /*
    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);
    */

    const deptSet = new Set();
    collection.forEach((course) => deptSet.add(course.dept));
    const departments = Array.from(deptSet).sort();

    const profSet = new Set();
    collection.forEach((course) => course.profs.forEach((prof) => profSet.add(prof.prof_name)));
    let professors = Array.from(profSet).sort((prof1, prof2) => {
      const prof1Last = prof1.substr(prof1.indexOf("."));
      const prof2Last = prof2.substr(prof2.indexOf("."));
      return prof1Last === prof2Last ? 0 : prof1Last < prof2Last ? -1 : 1;
    });
    if (!professors[0]){
      professors = professors.slice(1);
    }

    //  It looks like this way of getting professors was only getting the first prof in each class
    /*
    const profSet = new Set();
    const sortedProfs = collection.map((course) => {
      for (let i = 0; i < course.profs.length; i++) {
        return course.profs[i].prof_name;
      }}).sort();
    sortedProfs.forEach((e) => {
      if (!(profSet.has(e))) {
        if (e) {
          profSet.add(e)
        }
      }});
    const professors = Array.from(profSet);
    */

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
        <SearchBar searchByCallback={setSearchBarInput}/>
        <div data-testid = "filterBy" className={styles.wrapper}>
          <h2>Filtering by: {!filterBy ? "None" : filterBy}</h2>
        </div>
        <div className={styles.wrapper}>
          <div>
            <CardGrid courses={courses}/>
          </div>
          <div>
            <Filter setFilterBy={setFilterBy} departments={departments} prof={professors}/>
          </div>
          
        </div>
      </main>
    </div>
  );
}
