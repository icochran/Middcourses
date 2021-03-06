
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

    const sumArray = ((arr)=> {
        if (arr.length > 0) {
            let sum = 0
            arr.forEach((num) => sum += parseInt(num))
            return sum
        }
        else {
            return 0
        }
    })

    const setRating = async (courseid, prof_name, satisfaction, interest, time_commitment, difficulty) => {      
      const newRating = {
        course_id: courseid, 
        prof_name: prof_name, 
        satisfaction: satisfaction.toString(), 
        interest: interest.toString(), 
        time_commitment: time_commitment.toString(), 
        difficulty: difficulty.toString()
      }

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
        // need to find the aggregate satisfaction for each course.
        let aggregateSum = 0
        let totalReviews = 0
        course.profs.forEach((prof) => {
            totalReviews += prof.satisfaction.length
            aggregateSum += sumArray(prof.satisfaction)})
        if (aggregateSum/totalReviews >= 4) {
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
    collection.forEach((course) => course.profs.forEach((prof) =>{
        if (!profSet.has(prof)) {
            profSet.add(prof.prof_name.trim())
        }
    }));
     
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
            let reviewLengthA = 0
            let reviewLengthB = 0
            let noReviewsA = true
            let noReviewsB = true
            courseA.profs.forEach(prof => {
                reviewLengthA += prof.difficulty.length
                DifficultyA += sumArray(prof.difficulty)
                if (prof.difficulty.length !== 0) {
                    noReviewsA = false
                }})
            courseB.profs.forEach(prof => {
                reviewLengthB += prof.difficulty.length
                DifficultyB += sumArray(prof.difficulty)
                if (prof.difficulty.length !== 0) {
                    noReviewsB = false
                }})
            DifficultyA = DifficultyA/reviewLengthA
            DifficultyB = DifficultyB/reviewLengthB
            if (noReviewsA) {
                DifficultyA = 10
            }
            if (noReviewsB) {
                DifficultyB = 10
            }
            return DifficultyA - DifficultyB
            
        })
    }
    else if (sortBy === "Time Commitment") {
        courses.sort((courseA, courseB) => {
            let TCA = 0
            let TCB = 0
            let reviewLengthA = 0
            let reviewLengthB = 0
            let noReviewsA = true
            let noReviewsB = true
            courseA.profs.forEach(prof => {
                reviewLengthA += prof.time_commitment.length
                TCA += sumArray(prof.time_commitment)
                if (prof.time_commitment.length !== 0) {
                    noReviewsA = false
                }})
            courseB.profs.forEach(prof => {
                reviewLengthB += prof.time_commitment.length
                TCB += sumArray(prof.time_commitment)
                if (prof.time_commitment.length !== 0) {
                    noReviewsB = false
                }})
                TCA = TCA/reviewLengthA
                TCB = TCB/reviewLengthB
            if (noReviewsA) {
                TCA = 10
            }
            if (noReviewsB) {
                TCB = 10
            }
            return TCA - TCB
        })
    }
    else if (sortBy === "Interest") {
        courses.sort((courseA, courseB) => {
            let InterestA = 0
            let InterestB = 0
            let reviewLengthA = 0
            let reviewLengthB = 0
            let noReviewsA = true
            let noReviewsB = true
            courseA.profs.forEach(prof => {
                reviewLengthA += prof.interest.length
                InterestA += sumArray(prof.interest)
                if (prof.interest.length !== 0) {
                    noReviewsA = false
                }})
            courseB.profs.forEach(prof => {
                reviewLengthB += prof.interest.length
                InterestB += sumArray(prof.interest)
                if (prof.interest.length !== 0) {
                    noReviewsB = false
                }})
                InterestA = InterestA/reviewLengthA
                InterestB = InterestB/reviewLengthB
            if (noReviewsA) {
                InterestA = -1
            }
            if (noReviewsB) {
                InterestB = -1
            }
            return InterestA - InterestB
        })
    }
    else if (sortBy === "Satisfaction") {
        courses.sort((courseA, courseB) => {
            let SatisfactionA = 0
            let SatisfactionB = 0     
            let reviewLengthA = 0
            let reviewLengthB = 0
            let noReviewsA = true
            let noReviewsB = true
            courseA.profs.forEach(prof => {
                reviewLengthA += prof.satisfaction.length
                SatisfactionA += sumArray(prof.satisfaction)
                if (prof.satisfaction.length !== 0) {
                    noReviewsA = false
                }})
            courseB.profs.forEach(prof => {
                reviewLengthB += prof.satisfaction.length
                SatisfactionB += sumArray(prof.satisfaction)
                if (prof.satisfaction.length !== 0) {
                    noReviewsB = false
                }})
            SatisfactionA = SatisfactionA/reviewLengthA
            SatisfactionB = SatisfactionB/reviewLengthB
            if (noReviewsA) {
                SatisfactionA = -1
            }
            if (noReviewsB) {
                SatisfactionB = -1
            }
            return SatisfactionA - SatisfactionB
        })
    }
    if (sortBy === "Interest" || sortBy === "Satisfaction") {
        courses.reverse()
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Midd Courses</title>
      </Head>

        <main>
        <h1 className="title">Midd Courses</h1>
        <LoginWidget />
        <div className={styles.card}>
          <SecureItem setSearchBarInput ={setSearchBarInput} setSortBy={setSortBy} sortBy={sortBy} departments={departments} professors={professors} setFilterBy={setFilterBy} filterBy = {filterBy} courses={courses} setRating={setRating}/>
        </div> 
        </main>
    </div>
    );
}
