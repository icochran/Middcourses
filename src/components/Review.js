import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import React from "react";
import ProfDropDown from "./ProfDropDown";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Review({ course, changeState}) {
   const [prof, setProf] = useState(course.profs[0]);

   const courseName = course.class_name;

  
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

        <div className="difficulty">
            <p>Difficulty</p>
            <ButtonGroup aria-label="difficultyButtons">
                <Button variant="secondary">1</Button>
                <Button variant="secondary">2</Button>
                <Button variant="secondary">3</Button>
                <Button variant="secondary">4</Button>
                <Button variant="secondary">5</Button>
                <Button variant="secondary">6</Button>
                <Button variant="secondary">7</Button>
                <Button variant="secondary">8</Button>
                <Button variant="secondary">9</Button>
                <Button variant="secondary">10</Button>
            </ButtonGroup>
        </div>

        <div className="interesting">
            <p>Interest</p>
            <ButtonGroup aria-label="interestingButtons">
                <Button variant="secondary">1</Button>
                <Button variant="secondary">2</Button>
                <Button variant="secondary">3</Button>
                <Button variant="secondary">4</Button>
                <Button variant="secondary">5</Button>
                <Button variant="secondary">6</Button>
                <Button variant="secondary">7</Button>
                <Button variant="secondary">8</Button>
                <Button variant="secondary">9</Button>
                <Button variant="secondary">10</Button>
            </ButtonGroup>
        </div>

        <div className="satisfaction">
            <p>Overall Satisfaction</p>
            <ButtonGroup aria-label="interestingButtons">
                <Button variant="secondary">1</Button>
                <Button variant="secondary">2</Button>
                <Button variant="secondary">3</Button>
                <Button variant="secondary">4</Button>
                <Button variant="secondary">5</Button>
                <Button variant="secondary">6</Button>
                <Button variant="secondary">7</Button>
                <Button variant="secondary">8</Button>
                <Button variant="secondary">9</Button>
                <Button variant="secondary">10</Button>
            </ButtonGroup>
        </div>

        <div className="satisfaction">
            <p>Overall Satisfaction</p>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Time Commitment (hours) </Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>
            </Form>
        </div>

      </div>
      <button className="back" onClick= {changeState} >Back</button>
      <button className="submit">Submit</button>
    </div>
  );
}

Review.propTypes = {
  course: PropTypes.object.isRequired,
};