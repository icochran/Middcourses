
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import data from "../../data/seed.json"
//import data from "../../data/test-data.json"
import {useState,useEffect} from "react"
import useCollection from "../hooks/useCollection";


export default function MainPage() {

    const [filterBy, setFilterBy] = useState("")
    const [searchBarInput, setSearchBarInput] = useState()
    //const [collection, setCollection] = useState(data) 
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const average = ((numbers) => {
      return numbers.reduce(reducer) / numbers.length;
    })

    const collection = useCollection();

    /*
    useEffect(() => {
      
    }, [])
    */

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
        }
        });
    }

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    const profSet = new Set();
    const sortedProfs = collection.map((course) => {
      for (let i = 0; i < course.profs.length; i++) {
        const str = course.profs[i].prof_name;
        if (str.includes("Fall 2021")) {
          const ind = str.indexOf(":") + 2;
          const lInd = str.indexOf(";");
          return str.substring(ind,lInd);
        }
        if (str.includes("Spring 2022")) {
          const lInd = str.indexOf(";");
          const ind2 = str.indexOf(":", lInd) + 2;
          return str.substring(ind2);
        }
        if (str !== "") {
          return str;
        }
      }}).sort();
    sortedProfs.forEach((e) => {
      if (!(profSet.has(e))) {
        profSet.add(e)
      }});
    const professors = Array.from(profSet);

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
        <div className={styles.wrapper}>
          <h2>Filtering by: {filterBy === "" ? "None" : filterBy}</h2>
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
