import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import React from "react";
import ProfDropDown from "./ProfDropDown";
import { useMemo, useState } from "react";

export default function CourseCard({ course }) {
  const [prof, setprof] = useState(course.profs[0]);
  
  //for now we are just using the array of the first professor, though there are multiple
  const difficultyArray = prof.difficulty;
  const interestingArray = prof.interest;
  const timeCommitmentArray = prof.time_commitment;
  const satisfactionArray = prof.satisfaction;

  const courseName = course.class_name;

  //get the averages of the arrays as a number between 1 and 100
  const courseDifficulty100 =
    (difficultyArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    ) /
      difficultyArray.length) *
    10;
  const courseInteresting100 =
    (interestingArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    ) /
      interestingArray.length) *
    10;
  const courseTimeCommitment100 =
    (timeCommitmentArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    ) /
      timeCommitmentArray.length) *
    10;
  const courseTimeCommitmentHours =
    Math.round((courseTimeCommitment100 / 10) * 100) / 100;
  const courseSatisfactionPercent =
    satisfactionArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    ) /
    satisfactionArray.length /
    10;

  //get the weights for the gradient between green and red
  const wGreen = courseSatisfactionPercent * 255;
  const wRed = (1 - courseSatisfactionPercent) * 255;

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
    borderColor: `rgb(${wRed}, ${wGreen}, 0)`,
  };

  return (
    <div className={styles.classBox} style={classBoxStyle}>
      <div className={styles.classHeader}>
        <div className={styles.className}>
          <span>{courseName}</span>
        </div>
        <div>
          <ProfDropDown profs={course.profs} setProf={setprof}/>
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
              {courseTimeCommitmentHours} hours
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
