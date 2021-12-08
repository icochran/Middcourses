import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";
import RatingBar from "./RatingBar.js";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

export default function CourseCard({ course, seeDetails, setAddReview }) {
  const [profName, setProfName] = useState(course.profs[0].prof_name);

  const courseDetails = {...course}

  let prof;
  if (profName !== "Aggregate") {
    prof = course.profs.find((a) => a.prof_name === profName || a.prof_name === " ".concat(profName)); // some profs have a space before name, might want to fix in scraping
    if (!prof) {
      prof.prof_name = "No specific Professor";
    }
  } else {
    //cumulative value
    const p_in = courseDetails.profs.reduce((previous, current) => {
      return previous.concat(current.interest);
    }, []);
    const p_time = courseDetails.profs.reduce((previous, current) => {
      return previous.concat(current.time_commitment);
    }, []);
    const p_satisfaction = courseDetails.profs.reduce((previous, current) => {
      return previous.concat(current.satisfaction);
    }, []);
    const p_dif = courseDetails.profs.reduce((previous, current) => {
      return previous.concat(current.difficulty);
    }, []);

    prof = {
      prof_name: "Aggregate",
      satisfaction: p_satisfaction,
      difficulty: p_dif,
      interest: p_in,
      time_commitment: p_time,
    };
  }

  //for now we are just using the array of the first professor, though there are multiple
  const difficultyArray = prof.difficulty;
  const interestingArray = prof.interest;
  const timeCommitmentArray = prof.time_commitment;
  const satisfactionArray = prof.satisfaction;
  const courseName = course.class_name;

  function arrayToPercentage(array) {
    if(array.length>0) {
      let total=0;
      array.forEach((e) => total+=parseInt(e));
      return (total/array.length*20)
    }
    return 0;
  }

  function arrayToAverage(array) {
    if(array.length>0) {
      let total=0;
      array.forEach((e) => total+=parseInt(e));
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
        <ProfDropDown profs={course.profs} setProfName={setProfName} />
        </div>
        </div>
        <Card.Body >
          
            <RatingBar
              aspect="Difficulty"
              percentage={courseDifficulty100}
            />
            <RatingBar
              aspect="Interesting"
              percentage={courseInteresting100}
            />
            <RatingBar
              aspect="Time Commitment"
              percentage={courseTimeCommitment100}
            />
      
        </Card.Body>
        <Card.Body >
          <Stack direction="horizontal"  gap={4} >
            <Button id="review" onClick={()=>setAddReview()} variant="secondary" >
              + Add Review
            </Button>
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

