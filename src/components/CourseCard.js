import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";
import RatingBar from "./RatingBar.js";

export default function CourseCard({ course, changeState, seeDetails }) {
  let backgroundColor;
  const [profName, setProfName] = useState(course.profs[0].prof_name);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  console.log("below is course");
  console.log(course);
  
  const courseDetails = {...course}
  let prof;
  if (profName !== "Aggregate") {
    prof = course.profs.find((a) => a.prof_name === profName);
    if (!prof) {
      prof.prof_name = "No specific Professor"
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
 

  //get the averages of the arrays as a number between 1 and 100
  const courseDifficulty100 =
    (difficultyArray.reduce(reducer) / difficultyArray.length) * 10;
  const courseInteresting100 =
    (interestingArray.reduce(reducer) / interestingArray.length) *10;
  const courseTimeCommitment100 =
    (timeCommitmentArray.reduce(reducer) / timeCommitmentArray.length) * 10;
  const courseTimeCommitmentHours =
    Math.round((courseTimeCommitment100 / 10) * 100) / 100;
  const courseSatisfactionAverage =
    satisfactionArray.reduce(reducer) / satisfactionArray.length;

  //using the courseSatisfactionAverage set the color to red green or yellow
  if (courseSatisfactionAverage >= 4) {
    backgroundColor = "#d8ffc7"
  }
  else if (courseSatisfactionAverage >= 2) {
    backgroundColor = "#fffeb3";
  }
  else {
    backgroundColor = "#ffbaba"
  }

  //sets the color of the boxes
  const classBoxStyle = {
    borderColor: backgroundColor,
  };

  return (
    <div className={styles.classBox} style={classBoxStyle} role="gridcell">

      <div className={styles.classHeader}>
        <span data-testid = "courseName" className={styles.className}>{courseName}</span>
        <div className={styles.profBar}>
          <ProfDropDown profs={course.profs} setProfName={setProfName} />
        </div>
      </div>

      <div className={styles.courseBody}>
            <RatingBar aspect="Difficulty" percentage={courseDifficulty100} numHours={undefined}/>
            <RatingBar aspect="Interesting" percentage={courseInteresting100} numHours={undefined}/>
            <RatingBar aspect="Time Commitment" percentage={courseTimeCommitment100} numHours={courseTimeCommitmentHours}/>
      </div>
      <button className="review" onClick= {changeState} >Leave a Review</button>
      <button className="detailed" onClick = {seeDetails}>Details</button>
    </div>
  );
}


CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
