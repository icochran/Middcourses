
import Head from "next/head";

import styles from "../styles/Home.module.css";

import CardGrid from "../components/CardGrid"

import SearchBar from "../components/SearchBar"

import Filter from "../components/Filter"

import {useState} from "react"

export default function MainPage() {

    const [filterBy, setFilterBy] = useState (null)
    const [searchBarInput, setSearchBarInput] = useState("")
    const [collection] = useState (null) 
    //need to import the collection

    if (filterBy==="Difficulty"){
        //do some thing
    }

    if (searchBarInput){
        //search according to this input
    }

  return (
    <div className={styles.container}>
      <Head>
            <h1>Midd Courses</h1>
      </Head>

      <main>
            <SearchBar searchByCallback={setSearchBarInput}/>
            <Filter filterByCallback={setFilterBy}/>
            <CardGrid collection={collection}/>
      </main>
    </div>
  );
}
