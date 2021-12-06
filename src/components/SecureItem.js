import {useSession} from "next-auth/client"
import NavBar from "../components/NavBar"
import CardGrid from "../components/CardGrid"
import styles from "../styles/Home.module.css"

export default function SecureItem({setSearchBarInput, departments, professors, setFilterBy, setSortBy, filterBy, courses}){
  const [session] = useSession();
    return (
        <div>
            {(session) ? <div> <NavBar
  setSearchBar = {setSearchBarInput}
  departments={departments} 
  setSortBy = {setSortBy}
  prof={professors}
  setFilterBy={setFilterBy}/>
 <div className={styles.wrapper}>
    <h2>Filtering by: {filterBy === "" ? "None" : filterBy}</h2>
  </div>
  <div className={styles.wrapper}>
    <div>
      <CardGrid courses={courses}/>
    </div>
  </div> </div>: "You are not logged in"}
        </div>
    )
}