import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export default function DetailedCourseCard({ course, setBack }) {

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
    <Card  style={classBoxStyle} className={styles.detailedClassBox} role="gridcell">
      <div className={styles.detailedClassHeader}>
        <span className={styles.className}>{courseName}</span>
      </div>

      <div className={styles.courseBody}>
        <p>{courseDescription}</p>
        <p>{prereqs}</p>
      </div>
      <Button size="sm" variant="outline-secondary" onClick={()=>setBack()}>←Back</Button>
    </Card>
  );
}


DetailedCourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
