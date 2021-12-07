/* eslint-disable */

import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import React from "react";
import ProfDropDown from "./ProfDropDown";
import { useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Review({ course, changeState, setRating }) {
  //when setting the rating, you can still set the rating for aggregate
  const [prof, setProf] = useState(course.profs[0]);
  const [difficulty, setDifficulty] = useState();
  const [interest, setInterest] = useState();
  const [satisfaction, setSatisfaction] = useState();
  const [time, setTime] = useState();

  const courseName = course.class_name;

  const classBoxStyle = {
    borderColor: `rgb(${0.5}, ${0.5}, ${0.5})`,
  };

  // should dry out this code eventually
  return (
    <div styles={classBoxStyle} className={styles.classBox}>
      <Card style={{height:"32rem"}}>
        <Card.Body className="text-center"  className={styles.classHeader}>
          <Card.Title >{courseName}</Card.Title>
          <ProfDropDown profs={course.profs} setProfName={setProf} />
        </Card.Body>
        <Card.Body >
            <p>Difficulty</p>
            <ButtonGroup aria-label="difficultyButtons" size="sm" data-testid="Difficulty">
              <Button
                variant={difficulty === 1 ? "primary" : "secondary"}
                onClick={() => setDifficulty(1)}
              >
                1
              </Button>
              <Button
                variant={difficulty === 2 ? "primary" : "secondary"}
                onClick={() => setDifficulty(2)}
              >
                2
              </Button>
              <Button
                variant={difficulty === 3 ? "primary" : "secondary"}
                onClick={() => setDifficulty(3)}
              >
                3
              </Button>
              <Button
                variant={difficulty === 4 ? "primary" : "secondary"}
                onClick={() => setDifficulty(4)}
              >
                4
              </Button>
              <Button
                variant={difficulty === 5 ? "primary" : "secondary"}
                onClick={() => setDifficulty(5)}
              >
                5
              </Button>
            </ButtonGroup>
  

          <div className="interesting">
            <p>Interest</p>
            <ButtonGroup aria-label="interestingButtons" size="sm" data-testid="Interest">
              <Button
                variant={interest === 1 ? "primary" : "secondary"}
                onClick={() => setInterest(1)}
              >
                1
              </Button>
              <Button
                variant={interest === 2 ? "primary" : "secondary"}
                onClick={() => setInterest(2)}
              >
                2
              </Button>
              <Button
                variant={interest === 3 ? "primary" : "secondary"}
                onClick={() => setInterest(3)}
              >
                3
              </Button>
              <Button
                variant={interest === 4 ? "primary" : "secondary"}
                onClick={() => setInterest(4)}
              >
                4
              </Button>
              <Button
                variant={interest === 5 ? "primary" : "secondary"}
                onClick={() => setInterest(5)}
              >
                5
              </Button>
            </ButtonGroup>
          </div>

          <div className="satisfaction">
            <p>Overall Satisfaction</p>
            <ButtonGroup aria-label="satisfactionButtons" size="sm" data-testid="Satisfaction">
              <Button
                variant={satisfaction === 1 ? "primary" : "secondary"}
                onClick={() => setSatisfaction(1)}
              >
                1
              </Button>
              <Button
                variant={satisfaction === 2 ? "primary" : "secondary"}
                onClick={() => setSatisfaction(2)}
              >
                2
              </Button>
              <Button
                variant={satisfaction === 3 ? "primary" : "secondary"}
                onClick={() => setSatisfaction(3)}
              >
                3
              </Button>
              <Button
                variant={satisfaction === 4 ? "primary" : "secondary"}
                onClick={() => setSatisfaction(4)}
              >
                4
              </Button>
              <Button
                variant={satisfaction === 5 ? "primary" : "secondary"}
                onClick={() => setSatisfaction(5)}
              >
                5
              </Button>
            </ButtonGroup>
          </div>

          <div className="time commitment">
            <p>Time Commitment</p>
            <ButtonGroup aria-label="timeButtons" size="sm" data-testid="Time">
              <Button
                variant={time === 1 ? "primary" : "secondary"}
                onClick={() => setTime(1)}
              >
                1
              </Button>
              <Button
                variant={time === 2 ? "primary" : "secondary"}
                onClick={() => setTime(2)}
              >
                2
              </Button>
              <Button
                variant={time === 3 ? "primary" : "secondary"}
                onClick={() => setTime(3)}
              >
                3
              </Button>
              <Button
                variant={time === 4 ? "primary" : "secondary"}
                onClick={() => setTime(4)}
              >
                4
              </Button>
              <Button
                variant={time === 5 ? "primary" : "secondary"}
                onClick={() => setTime(5)}
              >
                5
              </Button>
              <Button
                variant={time === 6 ? "primary" : "secondary"}
                onClick={() => setTime(6)}
              >
                6
              </Button>
              <Button
                variant={time === 7 ? "primary" : "secondary"}
                onClick={() => setTime(7)}
              >
                7
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
        <button id="back" onClick={changeState} className={styles.backBtn}>
          ←Back
        </button>
        <Button
          disabled={!difficulty || !interest || !satisfaction || !time}
          id="submit"
          variant="success"
          className={styles.submitBtn}
          onClick={ () => {
            setRating(course.id, prof.prof_name, satisfaction, interest, time, difficulty);
            changeState();
          }}
        >
          Submit
        </Button>
      </Card>

    </div>
  );
}

Review.propTypes = {
  course: PropTypes.object.isRequired,
  changeState: PropTypes.func,
  setRating: PropTypes.func,
};
