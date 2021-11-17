import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import React from "react";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";

export default function Review({ course, changeState}) {
//   let wGreen = 0;
//   let wRed = 0;
//   let wYellow = 0;
   const [prof, setProf] = useState(course.profs[0]);
  
//   //for now we are just using the array of the first professor, though there are multiple
//   const difficultyArray = course.profs[0].difficulty;
//   const interestingArray = course.profs[0].interest;
//   const timeCommitmentArray = course.profs[0].time_commitment;
//   const satisfactionArray = course.profs[0].satisfaction;
//   const reducer = (previousValue, currentValue) => previousValue + currentValue;

   const courseName = course.class_name;

//   //get the averages of the arrays as a number between 1 and 100
//   const courseDifficulty100 =
//     (difficultyArray.reduce(reducer) / difficultyArray.length) * 10;
//   const courseInteresting100 =
//     (interestingArray.reduce(reducer) / interestingArray.length) *10;
//   const courseTimeCommitment100 =
//     (timeCommitmentArray.reduce(reducer) / timeCommitmentArray.length) * 10;
//   const courseTimeCommitmentHours =
//     Math.round((courseTimeCommitment100 / 10) * 100) / 100;
//   const courseSatisfactionAverage =
//     satisfactionArray.reduce(reducer) / satisfactionArray.length;

//   //using the courseSatisfactionAverage set the color to red green or yellow
//   if (courseSatisfactionAverage >= 4) {
//     wGreen = 255;
//     wRed = 0;
//     wYellow = 0;
//   }
//   else if (courseSatisfactionAverage >= 2) {
//     wGreen = 255;
//     wRed = 255;
//     wYellow = 0;
//   }
//   else {
//     wGreen = 0;
//     wRed = 255;
//     wYellow = 0;
//   }
//  const difficultyBarStyle = {
//     width: `${courseDifficulty100}%`,
//     background: "#47b5ff",
//   };
//   const interestingBarStyle = {
//     width: `${courseInteresting100}%`,
//     background: "#47b5ff",
//   };
//   const timeCommitmentBarStyle = {
//     width: `${courseTimeCommitment100}%`,
//     background: "#47b5ff",
//   };
//   const classBoxStyle = {
//     borderColor: `rgb(${0.5}, ${0.5}, ${0.5})`,
//   }; 

  const difficultyBarStyle = {
    width: "100",
    background: "#47b5ff",
  };
  const interestingBarStyle = {
    width: "100",
    background: "#47b5ff",
  };
  const timeCommitmentBarStyle = {
    width: "100",
    background: "#47b5ff",
  };
  const classBoxStyle = {
    borderColor: `rgb(${0.5}, ${0.5}, ${0.5})`,
  };   

  return (
    <div className={styles.classBox} style={classBoxStyle} >
      <div className={styles.classHeader}>
        <div className={styles.className}>
          <span>{courseName}</span>
        </div>
        <div>
          <ProfDropDown profs={course.profs} setProf={setProf}/>
        </div>
      </div>

      <div className={styles.courseBody}>
        <div className={styles.difficulty}>
          <div className="difficultyName">
            <p>Difficulty</p>
          </div>
          <div className={styles.difficultyBarBackground}>
            <span className={styles.difficultyBar} style={difficultyBarStyle} />
          </div>
        </div>

        <div className={styles.interesting}>
          <div className="interesting-name">
            <p>Interesting</p>
          </div>
          <div className={styles.interestingBarBackground}>
            <span
              className={styles.interestingBar}
              style={interestingBarStyle}
            />
          </div>
        </div>

        <div className="timecommitment">
          <div className="timecommitment-name">
            <p>Time Commitment</p>
          </div>
          <div className="timecommitment-bar-wrapper">
            <div className={styles.timecommitmentBarBackground}>
              <span
                className={styles.timecommitmentBar}
                style={timeCommitmentBarStyle}
              />
            </div>
            <div className={styles.timecommitmentBarNumber}>
              {" "}
              100 hours
            </div>
          </div>
        </div>
      </div>
      <button className="back" onClick= {changeState} >Back</button>
    </div>
  );
}

Review.propTypes = {
  course: PropTypes.object.isRequired,
};