
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import data from "../../data/seed.json"
//import data from "../../data/test-data.json"
import {useState,useEffect} from "react"


export default function MainPage() {

    const [filterBy, setFilterBy] = useState("")
    const [searchBarInput, setSearchBarInput] = useState()
    const [collection] = useState(data) 
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const average = ((numbers) => {
      return numbers.reduce(reducer) / numbers.length;
    })

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

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    if (searchBarInput){
      const newInput = searchBarInput.toLowerCase();
      courses = collection.filter((course) => course.class_name.toLowerCase().includes(newInput));
    }

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    if (filterBy){
      courses = collection.filter((course) => course.dept===filterBy);
      if (searchBarInput){
        const newInput = searchBarInput.toLowerCase();
        courses = courses.filter((course) => course.class_name.toLowerCase().includes(newInput));
      }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Midd Courses</title>
      </Head>

      <main className={styles.main}>
        <h1 className="title">Midd Courses</h1>
        <SearchBar searchByCallback={setSearchBarInput}/>
        <Filter setFilterBy={setFilterBy} departments = {departments}/>
        <CardGrid courses={courses}/>

      </main>
    </div>
  );
}
