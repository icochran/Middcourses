import PropTypes from "prop-types";

export default function SearchBar({searchByCallback}) {
    searchByCallback()
    return(
        <div>
            <h1>Search Bar</h1>
        </div>
    );
}

SearchBar.propTypes = {
    searchByCallback: PropTypes.func.isRequired
}