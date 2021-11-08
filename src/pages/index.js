
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import data from "../../data/test-data.json"
import { useState } from "react"

export default function MainPage() {

    const [filterBy, setFilterBy] = useState()
    const [searchBarInput, setSearchBarInput] = useState()
    const [collection] = useState(data) 

    let courses = [];

    if (searchBarInput){
      const newInput = searchBarInput.toLowerCase();
      courses = collection.filter((course) => course.class_name.toLowerCase().includes(newInput));
    } 

    if (filterBy==="Difficulty"){
      //do some thing
  }

  return (
    <div className={styles.container}>
      <Head>
        <h1>Midd Courses</h1>
      </Head>

      <main className={styles.main}>
            <SearchBar searchByCallback={setSearchBarInput}/>
            <Filter filterByCallback={setFilterBy}/>
            {(!searchBarInput && !filterBy) ? <CardGrid courses={collection}/> : <CardGrid courses={courses}/>}
      </main>
    </div>
  );
}
