import {useSession} from "next-auth/client"
import NavBar from "../components/NavBar"
import CardGrid from "../components/CardGrid"
import styles from "../styles/Home.module.css"

export default function SecureItem({setSearchBarInput, departments, professors, setFilterBy, setSortBy, sortBy, filterBy, courses, setRating}){
  const [session] = useSession();
    return (
        <div>
            {(session) ? <div data-testid="navBar"><div className={styles.navBarTop}><NavBar
  setSearchBar = {setSearchBarInput}
  departments={departments} 
  setSortBy = {setSortBy}
  prof={professors}
  setFilterBy={setFilterBy}/> </div>
 <div className={styles.wrapper}>
    <h2>Filtering by: {filterBy === "" ? "None" : filterBy} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Sorting by: {sortBy}</h2>
  </div>
  <div className={styles.wrapper}>
    <div>
      <CardGrid courses={courses} setRating={setRating}/>
    </div>
  </div> </div>: "You are not logged in"}
        </div>
    )
}
