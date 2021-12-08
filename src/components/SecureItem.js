import {useSession} from "next-auth/client"
import NavBar from "../components/NavBar"
import CardGrid from "../components/CardGrid"
import styles from "../styles/Home.module.css"
import PropTypes from "prop-types";

export default function SecureItem({setSearchBarInput, departments, professors, setFilterBy, filterBy, courses, setRating}){
  const [session] = useSession();
    return (
        <div>
            {(session) ? <div><div className={styles.navBarTop}><NavBar
  setSearchBar = {setSearchBarInput}
  departments={departments} 
  prof={professors}
  setFilterBy={setFilterBy}/></div>
 
    <h2 className={styles.centerH2}>Filtering by: {filterBy === "" ? "None" : filterBy}</h2>
  <div className={styles.wrapper}>
    <div>
      <CardGrid courses={courses} setRating={setRating}/>
    </div>
  </div> </div>: "You are not logged in"}
        </div>
    )
}
