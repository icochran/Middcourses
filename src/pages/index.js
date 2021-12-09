
import Head from "next/head"
import styles from "../styles/Home.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import useCollection from "../hooks/useCollection"
import {useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import LoginWidget from "../components/LoginWidget.js"
import SecureItem from "../components/SecureItem.js"

export default function MainPage() {
    const {data: collection, setData: setCollection} = useCollection();
    const [filterBy, setFilterBy] = useState("")
    const [sortBy, setSortBy] = useState("Satisfaction")
    const [searchBarInput, setSearchBarInput] = useState()
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const average = ((numbers) => {
        if (numbers.length > 0) {
            return numbers.reduce(reducer) / numbers.length;
        } else {
            return 0
        }
    })

    const setRating = async (courseid, prof_name, satisfaction, interest, time_commitment, difficulty) => {      
      const newRating = {
        course_id: courseid, 
        prof_name: prof_name, 
        satisfaction: satisfaction, 
        interest: interest, 
        time_commitment: time_commitment, 
        difficulty: difficulty
      }

      console.log(newRating);

      const response = await fetch(
        `/api/courses/${courseid}`,
        {
          method: "PUT",
          body: JSON.stringify(newRating),
          headers: new Headers({ "Content-type": "application/json" }),
        }
      )

      if(!response.ok) {
        throw new Error(response.statusText);
      }
          
      const updated_course = await response.json();

      const updated_collection = collection.map((course) => {
        if(course.id===courseid){
          return updated_course;
        }
        return course
      });

      setCollection(updated_collection);
    };
  
    let courses = collection.filter((course) => {
        if (average(course.profs[0].satisfaction) >= 4) {
            return course
        }
    });


    if (searchBarInput) {
        const newInput = searchBarInput.toLowerCase();
        courses = collection.filter((course) => {
            if (course.class_name.toLowerCase().includes(newInput)) {
                return course;
            }
            for (let i = 0; i < course.profs.length; i++) {
                if (course.profs[i].prof_name.toLowerCase().includes(newInput)) {
                    return course;
                }
            }
        });
    }

    const deptSet = new Set();
    collection.forEach((course) => deptSet.add(course.dept));
    const departments = Array.from(deptSet).sort();

    const profSet = new Set();
    collection.forEach((course) => course.profs.forEach((prof) => profSet.add(prof.prof_name.trim())));
    let professors = Array.from(profSet).sort((prof1, prof2) => {
        const prof1Last = prof1.substr(prof1.indexOf("."));
        const prof2Last = prof2.substr(prof2.indexOf("."));
        return prof1Last === prof2Last ? 0 : prof1Last < prof2Last ? -1 : 1;
    });
    if (!professors[0]) {
        professors = professors.slice(1);
    }

    if (filterBy) {
        courses = collection.filter((course) => {
            if (course.dept === filterBy) {
                return course;
            }
            for (let i = 0; i < course.profs.length; i++) {
                if (course.profs[i].prof_name.includes(filterBy)) {
                    return course;
                }
            }
        });
        if (searchBarInput) {
            const newInput = searchBarInput.toLowerCase();
            courses = courses.filter((course) => {
                if (course.class_name.toLowerCase().includes(newInput)) {
                    return course;
                }
                for (let i = 0; i < course.profs.length; i++) {
                    if (course.profs[i].prof_name.toLowerCase().includes(newInput)) {
                        return course;
                    }
                }
            });
        }
    }

    if (sortBy === "Difficulty") {
        courses.sort((courseA, courseB) => {
            let DifficultyA = 0
            let DifficultyB = 0
            courseA.profs.forEach(prof => DifficultyA += average(prof.difficulty))
            courseB.profs.forEach(prof => DifficultyB += average(prof.difficulty))
            DifficultyA = DifficultyA/courseA.profs.length
            DifficultyB = DifficultyB/courseB.profs.length
            return DifficultyA - DifficultyB
        })
    }
    else if (sortBy === "Time Commitment") {
        courses.sort((courseA, courseB) => {
            let TCA = 0
            let TCB = 0
            courseA.profs.forEach(prof => TCA += average(prof.time_commitment))
            courseB.profs.forEach(prof => TCB += average(prof.time_commitment))
            TCA = TCA/courseA.profs.length
            TCB = TCB/courseB.profs.length
            return TCA - TCB
        })
    }
    else if (sortBy === "Interest") {
        courses.sort((courseA, courseB) => {
            let InterestA = 0
            let InterestB = 0
            courseA.profs.forEach(prof => InterestA += average(prof.interest))
            courseB.profs.forEach(prof => InterestB += average(prof.interest))
            InterestA = InterestA/courseA.profs.length
            InterestB = InterestB/courseB.profs.length
            return InterestB - InterestA
        })
    }
    else if (sortBy === "Satisfaction") {
        courses.sort((courseA, courseB) => {
            let SatisfactionA = 0
            let SatisfactionB = 0
            courseA.profs.forEach(prof => SatisfactionA += average(prof.satisfaction))
            courseB.profs.forEach(prof => SatisfactionB += average(prof.satisfaction))
            SatisfactionA = SatisfactionA/courseA.profs.length
            SatisfactionB = SatisfactionB/courseB.profs.length
            return SatisfactionA - SatisfactionB
        })
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Midd Courses</title>
            </Head>

  return (
    <div className={styles.container}>
      <Head>
        <title>Midd Courses</title>
      </Head>

      <main>
        <h1 className="title">Midd Courses</h1>
        <LoginWidget />
        <div className={styles.card}>
          <SecureItem setSearchBarInput ={setSearchBarInput} departments={departments} professors={professors} setFilterBy={setFilterBy} filterBy = {filterBy} courses={courses} setRating={setRating}/> 
            </main>
        </div>
    );
}
