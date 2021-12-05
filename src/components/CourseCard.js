import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";
import RatingBar from "./RatingBar.js";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

export default function CourseCard({ course, changeState, seeDetails }) {
  let backgroundColor;
  const [profName, setProfName] = useState(course.profs[0].prof_name);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

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

  function arrayToAverage(array) {
    if(array.length>0) {
      return (array.reduce(reducer, 0) / array.length) * 10;
    } else {
      return 0;
    }
  }

  //get the averages of the arrays as a number between 1 and 100
  const courseDifficulty100 = arrayToAverage(difficultyArray);
  const courseInteresting100 = arrayToAverage(interestingArray);
  const courseTimeCommitment100 = arrayToAverage(timeCommitmentArray);
  const courseTimeCommitmentHours =
    Math.round((courseTimeCommitment100 / 10) * 100) / 100;
  const courseSatisfactionAverage = arrayToAverage(satisfactionArray);

  //using the courseSatisfactionAverage set the color to red green or yellow
  if (courseSatisfactionAverage >= 4) {
    backgroundColor = "#d8ffc7";
  } else if (courseSatisfactionAverage >= 2) {
    backgroundColor = "#fffeb3";
  } else {
    backgroundColor = "#ffbaba";
  }

  //sets the color of the boxes
  const classBoxStyle = {
    borderColor: backgroundColor,
  };

  return (
    <div style ={classBoxStyle} className={styles.classBox}>
      <Card
        // border="primary"
        style={{ height:"32rem" }}
      >
        <Card.Body className={styles.classHeader}>
          <Card.Title className={styles.courseTitle}>{courseName}</Card.Title>
          <ProfDropDown profs={course.profs} setProfName={setProfName} />
        </Card.Body>
        <Card.Body >
          
            <RatingBar
              aspect="Difficulty"
              percentage={courseDifficulty100}
              numHours={undefined}
            />
            <RatingBar
              aspect="Interesting"
              percentage={courseInteresting100}
              numHours={undefined}
            />
            <RatingBar
              aspect="Time Commitment"
              percentage={courseTimeCommitment100}
              numHours={courseTimeCommitmentHours}
            />
      
        </Card.Body>
        <Card.Body >
          <Stack direction="horizontal"  gap={4} >
            <Button id="review" onClick={changeState} variant="secondary" >
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

{
  /* <div className={styles.classBox} style={classBoxStyle} role="gridcell">
      <div className={styles.classHeader}>
        <span data-testid="courseName" className={styles.className}>
          {courseName}
        </span>
        <div className={styles.profBar}>
          <ProfDropDown profs={course.profs} setProfName={setProfName} />
        </div>
      </div>

      <div className={styles.courseBody}>
        <RatingBar
          aspect="Difficulty"
          percentage={courseDifficulty100}
          numHours={undefined}
        />
        <RatingBar
          aspect="Interesting"
          percentage={courseInteresting100}
          numHours={undefined}
        />
        <RatingBar
          aspect="Time Commitment"
          percentage={courseTimeCommitment100}
          numHours={courseTimeCommitmentHours}
        />
      </div>
      <Stack direction="horizontal" gap={3}>
        <Button id="review" onClick={changeState} variant="secondary">
          + Add Review
        </Button>
        <Button id="detailed" onClick={seeDetails} variant="secondary">
          Details
        </Button>
      </Stack>
    </div> */
}
