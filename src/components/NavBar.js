import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "./SearchBar";

import {
    signOut,
    useSession
  } from "next-auth/client"

export default function NavBar({setSearchBar, setFilterBy, setSortBy, departments, prof}) {

    const [ session ] = useSession()

    const depts = departments.map(dept => <NavDropdown.Item data-testid = "depts" key={dept} onClick={() => setFilterBy(dept)}>{dept}</NavDropdown.Item>);
    const profs = prof.map(professor => <NavDropdown.Item data-testid = "profs" key={professor} onClick={() => setFilterBy(professor)}>{professor}</NavDropdown.Item>);
    const orders = ["Satisfaction", "Time Commitment", "Difficulty", "Interest"].map(order => <NavDropdown.Item data-testid = "diffs" key={order} onClick={() => setSortBy(order)}>{order}</NavDropdown.Item>);

    return (
        
        <Navbar bg="light">
            <Container fluid>
                <NavbarBrand>MiddCourses</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown data-testid = "dept" title="Department" id="basic-nav-dropdown">
                            <NavDropdown.Item data-testid = "depts" onClick={() => setFilterBy("")}>None</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {depts}
                        </NavDropdown>
                        <NavDropdown title="Professor" id="basic-nav-dropdown">
                            <NavDropdown.Item data-testid = "profs" onClick={() => setFilterBy("")}>None</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {profs}
                        </NavDropdown>
                        <NavDropdown title="Sort By" id="basic-nav-dropdown">
                        <NavDropdown.Item data-testid = "sort">For the aggregate</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {orders}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <SearchBar searchByCallback = {setSearchBar}/>
                    </Nav>
                    <Nav>
                        <NavDropdown title={`Hi, ${session.user.email}!`}>
                            <NavDropdown.Item data-testid = "signOut" onClick={signOut}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}