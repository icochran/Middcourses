
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import data from "../../data/seed.json"
import {useState} from "react"


export default function MainPage() {

    const [filterBy, setFilterBy] = useState("")
    const [searchBarInput, setSearchBarInput] = useState()
    const [collection] = useState(data) 

    let courses = collection;

    if (searchBarInput){
      const newInput = searchBarInput.toLowerCase();
      courses = courses.filter((course) => course.class_name.toLowerCase().includes(newInput));
    }

    const deptSet = new Set();
    const sortedDepts = collection.map(course => course.dept).sort();
    sortedDepts.forEach(e => deptSet.add(e));
    const departments = Array.from(deptSet);

    if (filterBy){
      courses = courses.filter((course) => course.dept===filterBy);
    }

  return (
    <div className={styles.container}>
      <Head>
        <h1>Midd Courses</h1>
      </Head>

      <main className={styles.main}>
            <SearchBar searchByCallback={setSearchBarInput}/>
            <Filter 
            setFilterBy={setFilterBy}
            departments = {departments}
            />
            <CardGrid courses={courses}/>
      </main>
    </div>
  );
}
