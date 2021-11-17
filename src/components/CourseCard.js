import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";

export default function CourseCard({ course }) {
  let backgroundColor;
  const [profName, setProfName] = useState(course.profs[0].prof_name);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  const courseDetails = {...course}
  let prof;
  if (profName !== "Aggregate") {
    prof = course.profs.find((a) => a.prof_name === profName);
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
  let wGreen;
  let wRed;
  let wYellow;

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

  return (
    <div className={styles.classBox} style={classBoxStyle}>
      <div className={styles.wrapper}>
        <div className={styles.className}>
          <span>{courseName}</span>
        </div>
        <div>
          <ProfDropDown profs={course.profs} setProfName={setProfName} />
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
      look at filmReviewer
      <button className="review" onClick= "set review..." >Leave a Review</button>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
