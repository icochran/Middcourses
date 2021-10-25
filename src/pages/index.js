
import Head from "next/head";

import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid"

import SearchBar from "../components/SearchBar"

import Filter from "../components/Filter"

import {useState} from "react"

export default function MainPage() {

    const [filterBy, setFilterBy] = useState (null)
    const [searchBarInput, setSearchBarInput] = useState("")
    const [collection, setCollection] = useState (null) 
    //switch null to test data once we import it  

  return (
    <div className={styles.container}>
      <Head>
          <h1>Midd Courses</h1>
      </Head>

      <main>
        <SearchBar/>
        <Filter/>
        <CardGrid/>
      </main>
    </div>
  );
}
