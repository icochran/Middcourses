

import Head from "next/head";

import styles from "../styles/Home.module.css";

import CourseCard from "../components/CourseCard"

import SearchBar from "../components/SearchBar"

import Filter from "../components/Filter"

import testData from "";

import {useState} from "react"

export default function MainPage() {

    const [filterBy, setFilterBy] = useState (null)
    const [searchBarInput, setSearchBarInput] = useState("")
    const [collection, setCollection] = useState (testData)

  return (
    <div className={styles.container}>
      <Head>
          <SearchBar/>
          <Filter/>
      </Head>

      <main>
        <CourseCard/>
        <CourseCard/>
        <CourseCard/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
