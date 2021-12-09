import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button"
import PropTypes from "prop-types";

export default function ProfDropDown({profs, profName, setProfName}) {

  const profSet = new Set();
  profs.forEach((professor) => profSet.add(professor.prof_name.trim()));
  let professors = Array.from(profSet).sort((prof1, prof2) => {
    const prof1Last = prof1.substr(prof1.indexOf("."));
    const prof2Last = prof2.substr(prof2.indexOf("."));
    return prof1Last === prof2Last ? 0 : prof1Last < prof2Last ? -1 : 1;
  });
  if (!professors[0]){
    professors = professors.slice(1);
  }
  
  let profList = professors.map((name) => (
    <Dropdown.Item 
      key={name} 
      onClick={() => {
        setProfName(name);
      }}
      >{name}</Dropdown.Item>
  ));

  if (profs.length > 1) {
    profList = [
      <Dropdown.Item 
        key={"agg"} 
        onClick={() => {
          setProfName("Aggregate");
        }}>Aggregate</Dropdown.Item>,profList
    ]
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {profName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {profList}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (profs[0].prof_name === "") {
    return(
    <Button variant="success">No Professor Listed</Button>
    );
  } else {
    let name = profs[0].prof_name
    if (profs[0].prof_name === "") {
      name = "No Specific Professor"
    }
    return (
      <Button variant="success" className="text-center">{name}</Button>
    );
  }
}

ProfDropDown.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string)
};
