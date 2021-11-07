
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CardGrid from "../components/CardGrid"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import data from "../../data/test-data.json"
import { useState } from "react"

export default function MainPage() {

  const [filterByCategory, setFilterByCategory] = useState("")
  const [filterBySub, setFilterBySub] = useState("")
  const [searchBarInput, setSearchBarInput] = useState("")
  const [collection] = useState(data)

  let filteredCollection = collection;

  //Testing for filter functionality
  //Will add all filtering capabilites after this works
  if (filterByCategory === "Department") {
    filteredCollection = collection.filter(course => course.dept === filterBySub);
  }

  if (searchBarInput) {
    //search according to this input
  }

  return (
    <div className={styles.container}>
      <Head>
        <h1>Midd Courses</h1>
      </Head>

      <main>
        <SearchBar searchByCallback={setSearchBarInput} />
        <Filter
          setFilterByCategory={setFilterByCategory}
          setFilterBySub={setFilterBySub}
        />
        <CardGrid collection={filteredCollection} />
      </main>
    </div>
  );
}
