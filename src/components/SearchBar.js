import { useState } from "react"
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import styles from "../styles/Home.module.css";
import Stack from "react-bootstrap/Stack";


export default function SearchBar({ searchByCallback }) {
    const [searchBarText, setSearchBarText] = useState("");
    // handles pressing enter to search/clear
    function submit(event) {
        event.preventDefault()
        searchByCallback(searchBarText);
      }
    return (
        <div>
            <Form className="d-flex" onSubmit={submit}>
                <FormControl
                    type = "search"
                    placeholder="Search"
                    value={searchBarText}
                    id="searchBar"
                    onChange={(e) => {
                        setSearchBarText(e.target.value);
                    }}
                />
                <Stack direction="horizontal"  gap={1}>
                <Button
                    style={{width: "90px"}}
                    variant="outline-primary"
                    disabled = {(searchBarText === "" ? true : false)}
                    onClick = {() => searchByCallback(searchBarText)}
                >Search</Button>
                <Button
                    className={styles.clearButton}
                    variant="outline-primary"
                    onClick={() => {
                        setSearchBarText("");
                        searchByCallback();
                    }}
                >Clear</Button>
                </Stack>
            </Form>
        </div>

    );
}

SearchBar.propTypes = {
    searchByCallback: PropTypes.func.isRequired
}