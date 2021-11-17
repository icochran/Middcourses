import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import React from "react";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";

export default function CourseCard({ course }) {
  let wGreen;
  let wRed;
  let wYellow;
  const [prof, setProf] = useState(course.profs[0]);
  
  //for now we are just using the array of the first professor, though there are multiple
  const difficultyArray = course.profs[0].difficulty;
  const interestingArray = course.profs[0].interest;
  const timeCommitmentArray = course.profs[0].time_commitment;
  const satisfactionArray = course.profs[0].satisfaction;
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

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
    wGreen = 255;
    wRed = 0;
    wYellow = 0;
  }
  else if (courseSatisfactionAverage >= 2) {
    wGreen = 255;
    wRed = 255;
    wYellow = 0;
  }
  else {
    wGreen = 0;
    wRed = 255;
    wYellow = 0;
  }

  const difficultyBarStyle = {
    width: `${courseDifficulty100}%`,
    background: "#47b5ff",
  };
  const interestingBarStyle = {
    width: `${courseInteresting100}%`,
    background: "#47b5ff",
  };
  const timeCommitmentBarStyle = {
    width: `${courseTimeCommitment100}%`,
    background: "#47b5ff",
  };
  const classBoxStyle = {
    borderColor: `rgb(${wRed}, ${wGreen}, ${wYellow})`,
  };
  
    return(
    <div className={styles.classBox} style={classBoxStyle} role="gridcell">
        <div className={styles.wrapper}>
          <div className={styles.className}>
            <span>{courseName}</span>
          </div>
          <div className={styles.classProf}>
            <span>{prof.prof_name}</span>
          </div>

        </div>
        <div>
          <ProfDropDown profs={course.profs} setProf={setProf} />
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

          <div className={styles.courseBody}>
            <div className={styles.difficulty}>
              <div className="difficultyName">
                <p>Difficulty</p>
              </div>
              <div className={styles.difficultyBarBackground}>
                <span data-testid="difficultyBar" className={styles.difficultyBar} style={difficultyBarStyle} role="progressbar" />
              </div>
            </div>

            <div className={styles.interesting}>
              <div className="interesting-name">
                <p>Interesting</p>
              </div>
              <div className={styles.interestingBarBackground}>
                <span data-testid="interestingBar" className={styles.interestingBar} style={interestingBarStyle} role="progressbar" />
              </div>
            </div>

            <div className="timecommitment">
              <div className="timecommitment-name">
                <p>Time Commitment</p>
              </div>
              <div className="timecommitment-bar-wrapper">
                <div className={styles.timecommitmentBarBackground}>
                  <span data-testid="timecommitmentBar" className={styles.timecommitmentBar} style={timeCommitmentBarStyle} role="progressbar" />
                </div>
                <p data-testid="timecommitmentBarNumber" role="contentinfo" className={styles.timecommitmentBarNumber}>{courseTimeCommitmentHours} hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
