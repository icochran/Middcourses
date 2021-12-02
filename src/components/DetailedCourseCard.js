import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
//import ProfDropDown from "./ProfDropDown";
//import { useState } from "react";
//import RatingBar from "./RatingBar.js";

export default function DetailedCourseCard({ course, seeDetails }) {
  
//const reducer = (previousValue, currentValue) => previousValue + currentValue;

//const courseDetails = {...course}

//get the courseSatisfaction
/*
This should eventually get the course satisfaction...?
  const p_satisfaction = courseDetails.profs.reduce((previous, current) => {
    return previous.concat(current.satisfaction);
  }, []);
  const satisfactionArray = prof.satisfaction;
  const courseSatisfactionAverage =
  satisfactionArray.reduce(reducer) / satisfactionArray.length;
  //using the courseSatisfactionAverage set the color to red green or yellow
  let backgroundColor;
  if (courseSatisfactionAverage >= 4) {
    backgroundColor = "#d8ffc7";
  }
  else if (courseSatisfactionAverage >= 2) {
    backgroundColor = "#fffeb3";
  }
  else {
    backgroundColor = "#ffbaba";
  }
*/

const courseName = course.class_name;
let courseDescription = course.course_desc;
//to get the prereqs I should look for the last ) in the description. If it is more than say 10 characters away from the end set prereqs to undefined
let prereqs; 
if ((courseDescription.lastIndexOf(")"))!==-1 && courseDescription.length-courseDescription.lastIndexOf(")")<29) { //if there are prereqs
  //get the prereqs as a string
  const begginingOfPreReqs = courseDescription.lastIndexOf("(");
  const endOfPreReqs = courseDescription.lastIndexOf(")")+1;
  prereqs = courseDescription.substring(begginingOfPreReqs+1, endOfPreReqs-1);
  //take the prereqs out of the courseDescription string
  const begginingOfDescription = courseDescription.substring(0, begginingOfPreReqs);
  const endOfDescription = courseDescription.substring(endOfPreReqs+1);
  courseDescription = begginingOfDescription.concat(endOfDescription);
}

  //sets the color of the boxes
  const classBoxStyle = {
    borderColor: "#000000",
  };

  return (
    <div className={styles.detailedClassBox} style={classBoxStyle} role="gridcell">

      <div className={styles.detailedClassHeader}>
        <span className={styles.className}>{courseName}</span>
      </div>

      <div className={styles.courseBody}>
            <p>{courseDescription}</p>
            <p>{prereqs}</p>
      </div>

      <button id="back" className = {styles.backBtn} onClick= {seeDetails}>←Back</button>

    </div>
  );
}


DetailedCourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
