import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button"
import PropTypes from "prop-types";

export default function ProfDropDown({profs, setProfName}) {
  const profSet = new Set();
  const sortedProfs = []
   
  for (let i = 0; i < profs.length; i++) {
    sortedProfs[i] = (profs[i].prof_name);
  }
  sortedProfs.sort();
  sortedProfs.forEach((e) => {
  if (!(profSet.has(e))) {
    profSet.add(e)
  }});
  const professors = Array.from(profSet);
  
  let profList = professors.map((prof) => (
    <Dropdown.Item key={prof.prof_name} onClick={() => setProfName(prof.prof_name)}>{prof.prof_name}</Dropdown.Item>
  ));

  if (profs.length > 1) {
    profList = [<Dropdown.Item key={"agg"} onClick={() => setProfName("Aggregate")}>Aggregate</Dropdown.Item>,profList]
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Professors
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {profList}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <Button variant="success">{profs[0].prof_name}</Button>
      // <Dropdown>
      //   <Dropdown.Toggle variant="success" id="dropdown-basic">
      //     {profs[0].prof_name}
      //   </Dropdown.Toggle>
      // </Dropdown>
    );
  }
}

ProfDropDown.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.string),
};
