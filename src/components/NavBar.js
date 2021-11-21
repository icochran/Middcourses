import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "./SearchBar";
import styles from "../styles/Filter.module.css";



export default function NavBar({setSearchBar, setFilterBy, departments, prof}) {

    const depts = departments.map(dept => <NavDropdown.Item onClick={() => setFilterBy(dept)}>{dept}</NavDropdown.Item>);
    const profs = prof.map(professor => <NavDropdown.Item onClick={() => setFilterBy(professor)}>{professor}</NavDropdown.Item>);

    return (
        <Container fluid>
        <Navbar bg="light">
                <NavbarBrand>MiddCourses</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Department" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setFilterBy("")}>None</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {depts}
                        </NavDropdown>
                        <NavDropdown title="Professor" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setFilterBy("")}>None</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {profs}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <SearchBar searchByCallback = {setSearchBar}/>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        </Container>
    );
}