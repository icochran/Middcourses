import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import RatingBar from "./RatingBar.js";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

export default function CourseCard({ course, seeDetails, setAddReview, profName, setProfName }) {
 
  let inS = ""
  let timeS = ""
  let satS = ""
  let difS = ""

  let prof;
  if (profName !== "Aggregate") {
    prof = course.profs.find((a) => a.prof_name === profName || a.prof_name === " ".concat(profName)); // some profs have a space before name, might want to fix in scraping
  } else if(profName==="Aggregate"){
    
    course.profs.forEach((person) => {
      inS += person.interest.join()
      timeS += person.time_commitment.join()
      satS += person.satisfaction.join()
      difS += person.difficulty.join()
    })
    inS = inS.replace(/,/g,"")
    timeS =timeS.replace(/,/g,"")
    satS = satS.replace(/,/g,"")
    difS = difS.replace(/,/g,"")
    prof = {
      prof_name: "Aggregate",
      satisfaction: satS.split(""),
      difficulty: difS.split(""),
      interest: inS.split(""),
      time_commitment: timeS.split(""),
    };
  } else {
    prof.prof_name = "No specific Professor";
  }

  const numReviews = prof.difficulty.length
  
  const difficultyArray = prof.difficulty;
  const interestingArray = prof.interest;
  const timeCommitmentArray = prof.time_commitment;
  const satisfactionArray = prof.satisfaction;
  const courseName = course.class_name;

  function arrayToPercentage(array) {
    if(array.length>0) {
      let total=0;
      array.forEach((e) => total+=parseInt(e));
      return ((total/array.length)*20)
    }
    return 0;
  }

  function arrayToAverage(array) {
    if(array.length>0) {
      let total=0;
      array.forEach((e) => {total+=parseInt(e)});
      return total/array.length;
    }
    return 0;
  }

  //get the averages of the arrays as a number between 1 and 100
  const courseDifficulty100 = arrayToPercentage(difficultyArray);
  const courseInteresting100 = arrayToPercentage(interestingArray);
  const courseTimeCommitment100 = arrayToPercentage(timeCommitmentArray);
  const courseSatisfactionAverage = arrayToAverage(satisfactionArray);

  //using the courseSatisfactionAverage set the color to red green or yellow
  let style = styles.classBoxNoReview;
  if (courseSatisfactionAverage >= 4) {
    style = styles.classBoxHigh;
  } else if (courseSatisfactionAverage >= 2) {
    style = styles.classBoxMedium;
  } else if (courseSatisfactionAverage > 0) {
    style = styles.classBoxLow;
  }
  
  return (
    <div className={style} data-testid="courseCard">
      <Card
        // border="primary"
        style={{ height:"32rem" }}
      >
        <div>
        <Card.Body className={styles.classHeader}>
          <Card.Title data-testid="courseName" className={styles.courseTitle}>{courseName}</Card.Title>
        </Card.Body>
        <div className = {styles.profBar}>
        <ProfDropDown profs={course.profs} profName={profName} setProfName={setProfName} />
        </div>
        </div>
        <Card.Body >
            <RatingBar
              aspect="Difficulty"
              percentage={courseDifficulty100}
            />
            <RatingBar
              aspect="Interest"
              percentage={courseInteresting100}
            />
            <RatingBar
              aspect="Time Commitment"
              percentage={courseTimeCommitment100}
            />
            <p className={styles.nReviews}>{`${numReviews} Reviews`} </p>
        </Card.Body>
        <Card.Body >
          <Stack direction="horizontal"  gap={4} >
            {profName === "Aggregate"? <Button id="noreview" variant="secondary" >
              Select Professor </Button>
              : <Button id="review" onClick={()=>setAddReview()} variant="secondary" >
              + Add Review
            </Button>}
            <Button id="detailed" onClick={seeDetails} variant="secondary">
              Details
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
      

  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

